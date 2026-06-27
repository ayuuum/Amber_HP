-- ==========================================================================
-- Fine-tune Corpus + Self-Improvement
-- 2026-04-21
--
-- 全 Agent の draft vs Ayumu 修正後を自動蓄積。
-- 週次で Claude に改善案を生成させ、Ayumu 承認で反映する。
-- ==========================================================================

-- ---- ayumu_corrections: 修正履歴の正規化テーブル -----------------------
CREATE TABLE IF NOT EXISTS ayumu_corrections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL,
  action_type TEXT NOT NULL,         -- email_draft / dm / reply / proposal / invoice ...
  scope TEXT,                        -- operator / customer / lead ...
  scope_id TEXT,
  original_draft TEXT NOT NULL,      -- Agent が生成した初稿
  final_version TEXT NOT NULL,       -- Ayumu が送った最終版
  diff_summary TEXT,                 -- AIが生成する短い要約
  diff_tags TEXT[] DEFAULT ARRAY[]::TEXT[],  -- removed_opener / shortened / more_direct ...
  edit_distance INT,                 -- levenshtein距離（簡易）
  edit_ratio NUMERIC,                -- diff_size / original_size
  intent_id UUID REFERENCES agent_intents(id) ON DELETE SET NULL,
  source_message_id TEXT,            -- Slack message_ts / email_id / line_message_id
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_corrections_agent_time
  ON ayumu_corrections (agent_name, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_corrections_tags
  ON ayumu_corrections USING GIN (diff_tags);
-- ---- agent_improvement_proposals: 週次で生成される改善提案 -------------
CREATE TABLE IF NOT EXISTS agent_improvement_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL,
  proposal_type TEXT NOT NULL
    CHECK (proposal_type IN (
      'system_prompt','tone_rule','few_shot_example','threshold','workflow'
    )),
  summary TEXT NOT NULL,
  evidence JSONB NOT NULL DEFAULT '{}'::jsonb,  -- 元になった corrections/outcomes 参照
  proposed_change JSONB NOT NULL,  -- {before, after} 形式
  confidence TEXT DEFAULT 'medium'
    CHECK (confidence IN ('high','medium','low')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','applied','rejected','superseded')),
  applied_at TIMESTAMPTZ,
  applied_by TEXT,
  rejected_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_improve_status_agent
  ON agent_improvement_proposals (status, agent_name, created_at DESC);
-- ---- RLS ------------------------------------------------------------------
ALTER TABLE ayumu_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_improvement_proposals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all" ON ayumu_corrections;
CREATE POLICY "service_role_all" ON ayumu_corrections
  FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "service_role_all" ON agent_improvement_proposals;
CREATE POLICY "service_role_all" ON agent_improvement_proposals
  FOR ALL TO service_role USING (true) WITH CHECK (true);
-- ==========================================================================
-- RPC: 軽量 Levenshtein 距離（拡張なしで実装、短文向け）
-- ==========================================================================
CREATE OR REPLACE FUNCTION text_edit_distance(a TEXT, b TEXT) RETURNS INT
LANGUAGE plpgsql IMMUTABLE AS $$
DECLARE
  la INT := char_length(a);
  lb INT := char_length(b);
  dp INT[][];
  i INT;
  j INT;
BEGIN
  IF la = 0 THEN RETURN lb; END IF;
  IF lb = 0 THEN RETURN la; END IF;
  -- Postgres の組み込み levenshtein は fuzzystrmatch 必要。簡易版で代替:
  -- 長さ差が大きければ近似
  RETURN GREATEST(la, lb) - (
    -- 短すぎる近似なので、正確な距離は拡張導入後に置換
    LEAST(la, lb) * 0
  );
END;
$$;
-- ---- record_correction: draft + final から自動記録 ----------------------
CREATE OR REPLACE FUNCTION record_correction(
  p_agent_name TEXT,
  p_action_type TEXT,
  p_original_draft TEXT,
  p_final_version TEXT,
  p_scope TEXT DEFAULT NULL,
  p_scope_id TEXT DEFAULT NULL,
  p_intent_id UUID DEFAULT NULL,
  p_source_message_id TEXT DEFAULT NULL,
  p_diff_tags TEXT[] DEFAULT NULL,
  p_diff_summary TEXT DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  v_id UUID;
  v_edit_distance INT;
  v_edit_ratio NUMERIC;
BEGIN
  -- 簡易な長さ差を距離代わりに（正確な levenshtein は将来 fuzzystrmatch で）
  v_edit_distance := ABS(char_length(p_original_draft) - char_length(p_final_version));
  v_edit_ratio := CASE
    WHEN char_length(p_original_draft) = 0 THEN 1
    ELSE v_edit_distance::numeric / GREATEST(char_length(p_original_draft), 1)
  END;

  INSERT INTO ayumu_corrections (
    agent_name, action_type, scope, scope_id,
    original_draft, final_version,
    diff_tags, diff_summary,
    edit_distance, edit_ratio,
    intent_id, source_message_id
  ) VALUES (
    p_agent_name, p_action_type, p_scope, p_scope_id,
    p_original_draft, p_final_version,
    COALESCE(p_diff_tags, ARRAY[]::TEXT[]),
    p_diff_summary,
    v_edit_distance, v_edit_ratio,
    p_intent_id, p_source_message_id
  )
  RETURNING id INTO v_id;

  -- 同時に trust_event として edited を記録（scope あるとき）
  IF p_scope IS NOT NULL THEN
    PERFORM record_trust_event(
      p_agent_name,
      p_scope,
      p_scope_id,
      'edited',
      'ayumu_correction',
      p_intent_id
    );
  END IF;

  RETURN v_id;
END;
$$;
GRANT EXECUTE ON FUNCTION record_correction(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, UUID, TEXT, TEXT[], TEXT) TO service_role;
-- ==========================================================================
-- 観測 views
-- ==========================================================================
-- Agent 毎の修正傾向 TOP 10（最近30日）
CREATE OR REPLACE VIEW v_agent_correction_patterns AS
SELECT
  agent_name,
  action_type,
  tag,
  COUNT(*) AS occurrences,
  AVG(edit_ratio) AS avg_edit_ratio,
  MAX(created_at) AS last_seen_at
FROM ayumu_corrections, unnest(diff_tags) AS tag
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY agent_name, action_type, tag
ORDER BY agent_name, occurrences DESC;
GRANT SELECT ON v_agent_correction_patterns TO service_role;
-- Agent 毎の全体修正率（この数字が下がれば賢くなってる）
CREATE OR REPLACE VIEW v_agent_edit_rate AS
SELECT
  agent_name,
  DATE_TRUNC('week', created_at)::date AS week,
  COUNT(*) AS total_actions,
  AVG(edit_ratio) AS avg_edit_ratio,
  COUNT(*) FILTER (WHERE edit_ratio < 0.1) AS near_perfect_count
FROM ayumu_corrections
GROUP BY agent_name, DATE_TRUNC('week', created_at)
ORDER BY agent_name, week DESC;
GRANT SELECT ON v_agent_edit_rate TO service_role;
-- 未処理の改善提案
CREATE OR REPLACE VIEW v_pending_improvements AS
SELECT
  p.*,
  (NOW() - p.created_at) AS age
FROM agent_improvement_proposals p
WHERE status = 'pending'
ORDER BY created_at DESC;
GRANT SELECT ON v_pending_improvements TO service_role;
