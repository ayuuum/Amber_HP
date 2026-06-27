-- ==========================================================================
-- Agent Prompt Versioning (A4-lite)
-- 2026-04-21
--
-- 各 Agent の system prompt を DB で version 管理。
-- self-improve-weekly で生成された提案を Ayumu が Slack ボタンで承認→昇格。
-- Agent は起動時に active version を読んで使う（実装は次セッション以降）。
-- ==========================================================================

CREATE TABLE IF NOT EXISTS agent_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL,
  prompt_key TEXT NOT NULL DEFAULT 'system',  -- system / tone / few_shot など
  version INT NOT NULL,
  content TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT false,
  created_by TEXT DEFAULT 'self-improve-weekly',
  created_from_proposal UUID REFERENCES agent_improvement_proposals(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  activated_at TIMESTAMPTZ,
  UNIQUE (agent_name, prompt_key, version)
);
CREATE INDEX IF NOT EXISTS idx_agent_prompts_active
  ON agent_prompts (agent_name, prompt_key, active);
ALTER TABLE agent_prompts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all" ON agent_prompts;
CREATE POLICY "service_role_all" ON agent_prompts
  FOR ALL TO service_role USING (true) WITH CHECK (true);
-- ---- RPC: activate_prompt_version (承認時に呼ぶ、他の version を deactivate) ----
CREATE OR REPLACE FUNCTION activate_prompt_version(
  p_agent_name TEXT,
  p_prompt_key TEXT,
  p_version INT,
  p_activated_by TEXT DEFAULT 'ayumu'
) RETURNS BOOLEAN
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  -- 既存 active を deactivate
  UPDATE agent_prompts
    SET active = false
    WHERE agent_name = p_agent_name AND prompt_key = p_prompt_key AND active = true;

  -- 指定 version を activate
  UPDATE agent_prompts
    SET active = true, activated_at = NOW(), notes =
      COALESCE(notes, '') || format(' | activated by %s at %s', p_activated_by, NOW())
    WHERE agent_name = p_agent_name
      AND prompt_key = p_prompt_key
      AND version = p_version;

  IF NOT FOUND THEN RETURN false; END IF;
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION activate_prompt_version(TEXT, TEXT, INT, TEXT) TO service_role;
-- ---- Helper: get active prompt ---------------------------------------
CREATE OR REPLACE FUNCTION get_active_prompt(
  p_agent_name TEXT,
  p_prompt_key TEXT DEFAULT 'system'
) RETURNS TEXT
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $$
  SELECT content FROM agent_prompts
  WHERE agent_name = p_agent_name
    AND prompt_key = p_prompt_key
    AND active = true
  ORDER BY version DESC
  LIMIT 1;
$$;
GRANT EXECUTE ON FUNCTION get_active_prompt(TEXT, TEXT) TO service_role;
