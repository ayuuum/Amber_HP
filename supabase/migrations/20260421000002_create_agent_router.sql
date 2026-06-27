-- ==========================================================================
-- Agent Router / Intent-based Dispatch
-- 2026-04-21
--
-- Agent 同士を intent で疎結合に繋ぐ。
-- Agent A は「何を」したいか投げる、ルーターが「誰に」を解決する。
-- ==========================================================================

-- ---- agent_capabilities --------------------------------------------------
-- 各 Agent が扱える intent を宣言する台帳
CREATE TABLE IF NOT EXISTS agent_capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL UNIQUE,
  intents_handled TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  invoke_url TEXT NOT NULL,              -- 相対パス（例: /pine-sdr-agent）
  priority INT NOT NULL DEFAULT 100,     -- 小さい方が優先
  active BOOLEAN NOT NULL DEFAULT true,
  max_concurrent INT DEFAULT 5,          -- 同時実行上限
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_agent_capabilities_intents
  ON agent_capabilities USING GIN (intents_handled);
-- ---- agent_intents --------------------------------------------------------
-- 発行された intent とディスパッチ履歴
CREATE TABLE IF NOT EXISTS agent_intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intent_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_agent TEXT NOT NULL,            -- 発行元
  target_agents TEXT[] DEFAULT ARRAY[]::TEXT[],  -- resolved by router
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','dispatched','partial','completed','failed','no_handler')),
  urgency TEXT DEFAULT 'normal'
    CHECK (urgency IN ('low','normal','high','critical')),
  idempotency_key TEXT,                  -- 重複発行防止
  parent_intent_id UUID REFERENCES agent_intents(id) ON DELETE SET NULL,
  dispatch_results JSONB DEFAULT '[]'::jsonb, -- [{agent, ok, response, error}]
  created_at TIMESTAMPTZ DEFAULT NOW(),
  dispatched_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_agent_intents_status_created
  ON agent_intents(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_intents_type
  ON agent_intents(intent_type, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_agent_intents_idempotency
  ON agent_intents(idempotency_key) WHERE idempotency_key IS NOT NULL;
-- ---- RLS ------------------------------------------------------------------
ALTER TABLE agent_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_intents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all" ON agent_capabilities;
CREATE POLICY "service_role_all" ON agent_capabilities
  FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "service_role_all" ON agent_intents;
CREATE POLICY "service_role_all" ON agent_intents
  FOR ALL TO service_role USING (true) WITH CHECK (true);
-- ---- updated_at trigger ---------------------------------------------------
CREATE TRIGGER trg_agent_capabilities_updated BEFORE UPDATE ON agent_capabilities
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
-- ==========================================================================
-- 初期シード: 既存 Agent を agent_capabilities に登録
-- ==========================================================================
INSERT INTO agent_capabilities (agent_name, intents_handled, invoke_url, priority, notes)
VALUES
  ('pine-sdr-agent',
    ARRAY['accelerate_sales','research_company','dispatch_dm'],
    '/pine-sdr-agent', 50,
    'Pine新規事業者開拓。Google Maps + Firecrawl + パーソナライズDM'),
  ('cso-agent',
    ARRAY['draft_response','accelerate_sales','handle_inbound'],
    '/cso-agent', 50,
    'HP問い合わせ → リサーチ → 返信ドラフト'),
  ('scout-agent',
    ARRAY['research_company','research_industry'],
    '/scout-agent', 100,
    '業界/企業リサーチ+スコアリング'),
  ('cpo-agent',
    ARRAY['investigate_bug','spec_feature'],
    '/cpo-agent', 50,
    'バグ/要望 → 仕様書 → GitHub Issue'),
  ('cos-agent',
    ARRAY['schedule_meeting','prep_meeting','draft_email','answer_question'],
    '/cos-agent', 50,
    'Ayumu AI秘書。調査/資料/壁打ち'),
  ('daily-amber-brief',
    ARRAY['summarize_state'],
    '/daily-amber-brief', 100,
    '会社状態サマリー投稿'),
  ('workshop-ops-agent',
    ARRAY['workshop_reminder','workshop_followup','workshop_report'],
    '/workshop-ops-agent', 50,
    '研修運用（リマインド/レポート/フォロー）'),
  ('weekly-sdr-agent',
    ARRAY['accelerate_sales','research_company'],
    '/weekly-sdr-agent', 100,
    '営業リサーチ+アプローチ文'),
  ('cashflow-projector',
    ARRAY['project_cashflow','analyze_finance'],
    '/cashflow-projector', 100,
    'CF予測・ランウェイ計算'),
  ('decision-logger',
    ARRAY['log_decision','query_decision'],
    '/decision-logger', 100,
    '意思決定ログ')
ON CONFLICT (agent_name) DO UPDATE
  SET intents_handled = EXCLUDED.intents_handled,
      invoke_url = EXCLUDED.invoke_url,
      priority = EXCLUDED.priority,
      notes = EXCLUDED.notes,
      updated_at = NOW();
-- ==========================================================================
-- Helper RPC: intent を解決して対応 Agent 一覧を返す
-- ==========================================================================
CREATE OR REPLACE FUNCTION resolve_intent(p_intent_type TEXT)
RETURNS TABLE (agent_name TEXT, invoke_url TEXT, priority INT)
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $$
  SELECT c.agent_name, c.invoke_url, c.priority
  FROM agent_capabilities c
  WHERE c.active = true
    AND p_intent_type = ANY(c.intents_handled)
  ORDER BY c.priority ASC, c.agent_name ASC;
$$;
GRANT EXECUTE ON FUNCTION resolve_intent(TEXT) TO service_role;
-- ==========================================================================
-- 観測用 view: 最近の intent 実績
-- ==========================================================================
CREATE OR REPLACE VIEW v_recent_intents AS
SELECT
  intent_type,
  COUNT(*) AS count_total,
  COUNT(*) FILTER (WHERE status = 'completed') AS count_completed,
  COUNT(*) FILTER (WHERE status = 'failed') AS count_failed,
  COUNT(*) FILTER (WHERE status = 'no_handler') AS count_no_handler,
  MAX(created_at) AS last_seen_at
FROM agent_intents
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY intent_type
ORDER BY count_total DESC;
GRANT SELECT ON v_recent_intents TO service_role;
