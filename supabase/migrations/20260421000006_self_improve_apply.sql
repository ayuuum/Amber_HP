-- ==========================================================================
-- Self-Improve Safe-Apply + Circuit Breaker
-- 2026-04-21 (60% → 90% autonomy)
-- ==========================================================================

-- ---- agent_improvement_proposals: auto_applicable フラグ追加 --------------
ALTER TABLE agent_improvement_proposals
  ADD COLUMN IF NOT EXISTS auto_applicable BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS auto_applied_at TIMESTAMPTZ;
-- ---- agent_capabilities に circuit breaker カラム追加 --------------------
ALTER TABLE agent_capabilities
  ADD COLUMN IF NOT EXISTS consecutive_failures INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS disabled_until TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS disabled_reason TEXT;
-- ---- RPC: apply_threshold_change (安全な範囲内のみ自動適用) --------------
CREATE OR REPLACE FUNCTION apply_threshold_change(
  p_agent_name TEXT,
  p_action_type TEXT,
  p_new_min_score NUMERIC,
  p_max_delta NUMERIC DEFAULT 5
) RETURNS BOOLEAN
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  v_current NUMERIC;
  v_delta NUMERIC;
BEGIN
  SELECT min_score INTO v_current
  FROM agent_trust_thresholds
  WHERE agent_name = p_agent_name AND action_type = p_action_type;

  IF v_current IS NULL THEN
    -- 未定義はこの仕組みでは追加しない（新規は Ayumu承認）
    RETURN false;
  END IF;

  -- 顧客接触 threshold (100固定) には触らない
  IF v_current >= 100 THEN RETURN false; END IF;

  v_delta := ABS(p_new_min_score - v_current);
  IF v_delta > p_max_delta THEN
    -- 許容幅を超える変更は Ayumu承認経由
    RETURN false;
  END IF;

  -- 0-100 範囲内かつ100未満を維持
  IF p_new_min_score < 0 OR p_new_min_score >= 100 THEN
    RETURN false;
  END IF;

  UPDATE agent_trust_thresholds
  SET min_score = p_new_min_score,
      notes = COALESCE(notes, '') || ' | auto-tuned ' || NOW()::TEXT,
      updated_at = NOW()
  WHERE agent_name = p_agent_name AND action_type = p_action_type;

  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION apply_threshold_change(TEXT, TEXT, NUMERIC, NUMERIC) TO service_role;
-- ---- RPC: circuit_breaker_check (Agent 連続失敗監視) ---------------------
CREATE OR REPLACE FUNCTION record_agent_failure(
  p_agent_name TEXT,
  p_reason TEXT DEFAULT NULL
) RETURNS VOID
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  v_failures INT;
BEGIN
  UPDATE agent_capabilities
    SET consecutive_failures = consecutive_failures + 1
    WHERE agent_name = p_agent_name
    RETURNING consecutive_failures INTO v_failures;

  IF v_failures IS NOT NULL AND v_failures >= 5 THEN
    UPDATE agent_capabilities
      SET active = false,
          disabled_until = NOW() + INTERVAL '2 hours',
          disabled_reason = COALESCE(p_reason, 'consecutive_failures>=5')
      WHERE agent_name = p_agent_name;
  END IF;
END;
$$;
CREATE OR REPLACE FUNCTION record_agent_success(p_agent_name TEXT) RETURNS VOID
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE agent_capabilities
    SET consecutive_failures = 0
    WHERE agent_name = p_agent_name;
END;
$$;
GRANT EXECUTE ON FUNCTION record_agent_failure(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION record_agent_success(TEXT) TO service_role;
-- ---- 観測 view: 調整された閾値の履歴 -----------------------------------
CREATE OR REPLACE VIEW v_auto_applied_improvements AS
SELECT
  agent_name,
  proposal_type,
  summary,
  auto_applied_at,
  created_at
FROM agent_improvement_proposals
WHERE status = 'applied' AND auto_applied_at IS NOT NULL
ORDER BY auto_applied_at DESC;
GRANT SELECT ON v_auto_applied_improvements TO service_role;
-- ---- resolve_intent を改修: 無効 Agent は除外 ---------------------------
CREATE OR REPLACE FUNCTION resolve_intent(p_intent_type TEXT)
RETURNS TABLE (agent_name TEXT, invoke_url TEXT, priority INT)
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $$
  SELECT c.agent_name, c.invoke_url, c.priority
  FROM agent_capabilities c
  WHERE c.active = true
    AND (c.disabled_until IS NULL OR c.disabled_until < NOW())
    AND p_intent_type = ANY(c.intents_handled)
  ORDER BY c.priority ASC, c.agent_name ASC;
$$;
