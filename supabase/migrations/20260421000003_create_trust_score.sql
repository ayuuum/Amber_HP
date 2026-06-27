-- ==========================================================================
-- Trust Score Framework
-- 2026-04-21
--
-- (agent, scope, scope_id) ごとに信頼スコア 0-100 を持ち、
-- 閾値で auto_send / require_approval / escalate を決める。
-- pine-support-agent v2 の段階解放をframework化、全Agentに横展開可能に。
-- ==========================================================================

-- ---- agent_trust_scores ---------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_trust_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL,
  scope TEXT NOT NULL
    CHECK (scope IN ('global','operator','customer','lead','channel','contact')),
  scope_id TEXT,                       -- null for global scope
  score NUMERIC NOT NULL DEFAULT 50
    CHECK (score >= 0 AND score <= 100),
  total_outcomes INT NOT NULL DEFAULT 0,
  success_count INT NOT NULL DEFAULT 0,
  error_count INT NOT NULL DEFAULT 0,
  last_evaluated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (agent_name, scope, scope_id)
);
CREATE INDEX IF NOT EXISTS idx_trust_scores_lookup
  ON agent_trust_scores (agent_name, scope, scope_id);
-- ---- agent_trust_events ---------------------------------------------------
-- スコア変動の生ログ
CREATE TABLE IF NOT EXISTS agent_trust_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL,
  scope TEXT NOT NULL,
  scope_id TEXT,
  outcome TEXT NOT NULL
    CHECK (outcome IN ('success','approved','edited','rejected','error','complained','timeout')),
  delta NUMERIC NOT NULL,               -- 実際に加算した値
  reason TEXT,
  intent_id UUID REFERENCES agent_intents(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_trust_events_agent_time
  ON agent_trust_events (agent_name, scope, scope_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trust_events_intent
  ON agent_trust_events (intent_id);
-- ---- agent_trust_thresholds ----------------------------------------------
CREATE TABLE IF NOT EXISTS agent_trust_thresholds (
  agent_name TEXT NOT NULL,
  action_type TEXT NOT NULL,            -- auto_send / draft_only / require_approval / ...
  min_score NUMERIC NOT NULL,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (agent_name, action_type)
);
-- ---- RLS ------------------------------------------------------------------
ALTER TABLE agent_trust_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_trust_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_trust_thresholds ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all" ON agent_trust_scores;
CREATE POLICY "service_role_all" ON agent_trust_scores
  FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "service_role_all" ON agent_trust_events;
CREATE POLICY "service_role_all" ON agent_trust_events
  FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "service_role_all" ON agent_trust_thresholds;
CREATE POLICY "service_role_all" ON agent_trust_thresholds
  FOR ALL TO service_role USING (true) WITH CHECK (true);
-- ==========================================================================
-- 初期シード: Agent 毎の閾値
-- 原則: 顧客接触を伴うものは min_score=100 (= 到達不能) にして強制承認
-- ==========================================================================
INSERT INTO agent_trust_thresholds (agent_name, action_type, min_score, notes) VALUES
  -- pine-support-agent: CS自動応答。shadow → review → auto の段階解放
  ('pine-support-agent', 'auto_send', 85, '85点以上で事業者LINEへ自動返信'),
  ('pine-support-agent', 'require_approval', 60, '60-84はAyumu承認'),
  ('pine-support-agent', 'shadow_only', 0, '60未満はshadow'),

  -- cso-agent: HP問い合わせ対応。顧客接触は常に承認
  ('cso-agent', 'auto_send', 100, '到達不能: 顧客向けメール送付は常に承認必須'),
  ('cso-agent', 'draft_only', 0, 'draft生成は常にOK'),

  -- invoice-dispatcher: 請求書送付。顧客接触は常に承認
  ('invoice-dispatcher', 'auto_send', 100, '請求書送付は常に承認必須'),
  ('invoice-dispatcher', 'draft_only', 0, 'ドラフト生成は常にOK'),

  -- pine-sdr-agent: アウトバウンドDM。顧客接触
  ('pine-sdr-agent', 'auto_send', 100, 'DM送付は常に承認必須'),
  ('pine-sdr-agent', 'draft_only', 0, 'リスト+DMドラフトは常にOK'),

  -- finance-daily-sync: 督促メール。顧客接触
  ('finance-daily-sync', 'auto_send', 100, '督促メール送付は常に承認必須'),
  ('finance-daily-sync', 'draft_only', 0, 'ドラフト生成は常にOK'),

  -- 社内のみ Agent: 常時 auto OK
  ('daily-amber-brief', 'auto_send', 0, '社内Slackのみ'),
  ('cashflow-projector', 'auto_send', 0, '社内Slackのみ'),
  ('contract-expiry-watch', 'auto_send', 0, '社内Slackのみ'),
  ('okr-review', 'auto_send', 0, '社内Slackのみ'),
  ('decision-logger', 'auto_send', 0, '社内DBのみ'),
  ('agent-router', 'auto_send', 0, '内部ディスパッチのみ')
ON CONFLICT (agent_name, action_type) DO UPDATE
  SET min_score = EXCLUDED.min_score,
      notes = EXCLUDED.notes,
      updated_at = NOW();
-- ==========================================================================
-- RPC: trust_allows() — 指定アクションが実行可能か判定
-- ==========================================================================
CREATE OR REPLACE FUNCTION trust_allows(
  p_agent_name TEXT,
  p_action_type TEXT,
  p_scope TEXT DEFAULT 'global',
  p_scope_id TEXT DEFAULT NULL
) RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
DECLARE
  v_threshold NUMERIC;
  v_score NUMERIC;
BEGIN
  -- 閾値取得
  SELECT min_score INTO v_threshold
  FROM agent_trust_thresholds
  WHERE agent_name = p_agent_name AND action_type = p_action_type;

  -- 閾値未定義 → 安全側で false（action が未宣言ならやらせない）
  IF v_threshold IS NULL THEN
    RETURN false;
  END IF;

  -- 対象のスコア（無ければ global にフォールバック、それも無ければデフォルト50）
  SELECT score INTO v_score
  FROM agent_trust_scores
  WHERE agent_name = p_agent_name
    AND scope = p_scope
    AND (scope_id IS NOT DISTINCT FROM p_scope_id);

  IF v_score IS NULL AND p_scope != 'global' THEN
    SELECT score INTO v_score
    FROM agent_trust_scores
    WHERE agent_name = p_agent_name AND scope = 'global' AND scope_id IS NULL;
  END IF;

  IF v_score IS NULL THEN v_score := 50; END IF;

  RETURN v_score >= v_threshold;
END;
$$;
GRANT EXECUTE ON FUNCTION trust_allows(TEXT, TEXT, TEXT, TEXT) TO service_role;
-- ==========================================================================
-- RPC: record_trust_event() — outcome 記録 + スコア更新
-- ==========================================================================
CREATE OR REPLACE FUNCTION record_trust_event(
  p_agent_name TEXT,
  p_scope TEXT,
  p_scope_id TEXT,
  p_outcome TEXT,
  p_reason TEXT DEFAULT NULL,
  p_intent_id UUID DEFAULT NULL
) RETURNS NUMERIC
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  v_delta NUMERIC;
  v_new_score NUMERIC;
BEGIN
  -- outcome → delta マップ
  v_delta := CASE p_outcome
    WHEN 'success'    THEN  2.0
    WHEN 'approved'   THEN  1.0
    WHEN 'edited'     THEN  0.5
    WHEN 'rejected'   THEN -3.0
    WHEN 'error'      THEN -5.0
    WHEN 'complained' THEN -10.0
    WHEN 'timeout'    THEN -2.0
    ELSE 0.0
  END;

  -- event 記録
  INSERT INTO agent_trust_events (
    agent_name, scope, scope_id, outcome, delta, reason, intent_id
  ) VALUES (
    p_agent_name, p_scope, p_scope_id, p_outcome, v_delta, p_reason, p_intent_id
  );

  -- スコア更新（upsert）
  INSERT INTO agent_trust_scores (agent_name, scope, scope_id, score, total_outcomes,
                                   success_count, error_count)
  VALUES (
    p_agent_name, p_scope, p_scope_id,
    GREATEST(0, LEAST(100, 50 + v_delta)),
    1,
    CASE WHEN p_outcome IN ('success','approved') THEN 1 ELSE 0 END,
    CASE WHEN p_outcome IN ('error','rejected','complained') THEN 1 ELSE 0 END
  )
  ON CONFLICT (agent_name, scope, scope_id) DO UPDATE
    SET score = GREATEST(0, LEAST(100, agent_trust_scores.score + v_delta)),
        total_outcomes = agent_trust_scores.total_outcomes + 1,
        success_count = agent_trust_scores.success_count +
          CASE WHEN p_outcome IN ('success','approved') THEN 1 ELSE 0 END,
        error_count = agent_trust_scores.error_count +
          CASE WHEN p_outcome IN ('error','rejected','complained') THEN 1 ELSE 0 END,
        last_evaluated_at = NOW()
  RETURNING score INTO v_new_score;

  RETURN v_new_score;
END;
$$;
GRANT EXECUTE ON FUNCTION record_trust_event(TEXT, TEXT, TEXT, TEXT, TEXT, UUID) TO service_role;
-- ==========================================================================
-- RPC: get_trust_score() — 現在値を返す（無ければデフォルト）
-- ==========================================================================
CREATE OR REPLACE FUNCTION get_trust_score(
  p_agent_name TEXT,
  p_scope TEXT DEFAULT 'global',
  p_scope_id TEXT DEFAULT NULL
) RETURNS NUMERIC
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
DECLARE
  v_score NUMERIC;
BEGIN
  SELECT score INTO v_score
  FROM agent_trust_scores
  WHERE agent_name = p_agent_name
    AND scope = p_scope
    AND (scope_id IS NOT DISTINCT FROM p_scope_id);
  RETURN COALESCE(v_score, 50);
END;
$$;
GRANT EXECUTE ON FUNCTION get_trust_score(TEXT, TEXT, TEXT) TO service_role;
-- ==========================================================================
-- 観測用 view: Agent別の信頼状態サマリー
-- ==========================================================================
CREATE OR REPLACE VIEW v_agent_trust_summary AS
SELECT
  s.agent_name,
  s.scope,
  COUNT(*) AS entities_tracked,
  AVG(s.score) AS avg_score,
  MIN(s.score) AS min_score,
  MAX(s.score) AS max_score,
  SUM(s.success_count) AS total_success,
  SUM(s.error_count) AS total_error
FROM agent_trust_scores s
GROUP BY s.agent_name, s.scope;
GRANT SELECT ON v_agent_trust_summary TO service_role;
