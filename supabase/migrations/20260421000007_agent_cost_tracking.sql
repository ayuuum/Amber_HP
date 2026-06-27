-- ==========================================================================
-- Agent Cost Tracking + Auto-Pause (A3)
-- 2026-04-21
--
-- Claude API / Firecrawl / Exa の利用コストを集計する仕組みと、
-- 日次閾値超過で circuit breaker を発動する Edge Function 用の view。
-- ==========================================================================

-- 既存 dashboard_agent_metrics に概算コストカラム追加
ALTER TABLE dashboard_agent_metrics
  ADD COLUMN IF NOT EXISTS tokens_claude_in BIGINT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tokens_claude_out BIGINT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS api_calls_firecrawl INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS api_calls_exa INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS estimated_cost_usd NUMERIC DEFAULT 0;
-- Cost unit table (管理画面で調整可能)
CREATE TABLE IF NOT EXISTS agent_cost_units (
  service TEXT PRIMARY KEY,
  unit_label TEXT NOT NULL,              -- "per 1M input tokens" など
  unit_price_usd NUMERIC NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO agent_cost_units (service, unit_label, unit_price_usd) VALUES
  ('claude_haiku_in', 'per 1M input tokens', 1.00),
  ('claude_haiku_out', 'per 1M output tokens', 5.00),
  ('claude_sonnet_in', 'per 1M input tokens', 3.00),
  ('claude_sonnet_out', 'per 1M output tokens', 15.00),
  ('firecrawl_scrape', 'per 1000 calls', 2.00),
  ('exa_search', 'per 1000 calls', 5.00)
ON CONFLICT (service) DO UPDATE
  SET unit_price_usd = EXCLUDED.unit_price_usd, updated_at = NOW();
ALTER TABLE agent_cost_units ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all" ON agent_cost_units;
CREATE POLICY "service_role_all" ON agent_cost_units
  FOR ALL TO service_role USING (true) WITH CHECK (true);
-- Daily cost view
CREATE OR REPLACE VIEW v_daily_agent_cost AS
SELECT
  snapshot_date,
  agent_name,
  invocation_count,
  tokens_claude_in,
  tokens_claude_out,
  api_calls_firecrawl,
  api_calls_exa,
  estimated_cost_usd
FROM dashboard_agent_metrics
WHERE snapshot_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY snapshot_date DESC, estimated_cost_usd DESC;
GRANT SELECT ON v_daily_agent_cost TO service_role;
-- Total daily cost view (全Agent合算)
CREATE OR REPLACE VIEW v_daily_total_cost AS
SELECT
  snapshot_date,
  SUM(invocation_count) AS total_invocations,
  SUM(estimated_cost_usd) AS total_cost_usd
FROM dashboard_agent_metrics
GROUP BY snapshot_date
ORDER BY snapshot_date DESC;
GRANT SELECT ON v_daily_total_cost TO service_role;
-- Budget settings
CREATE TABLE IF NOT EXISTS budget_limits (
  id INT PRIMARY KEY DEFAULT 1,
  daily_warn_usd NUMERIC NOT NULL DEFAULT 20,
  daily_pause_usd NUMERIC NOT NULL DEFAULT 50,
  monthly_cap_usd NUMERIC NOT NULL DEFAULT 500,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (id = 1)
);
INSERT INTO budget_limits (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
ALTER TABLE budget_limits ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all" ON budget_limits;
CREATE POLICY "service_role_all" ON budget_limits
  FOR ALL TO service_role USING (true) WITH CHECK (true);
