-- Dashboard KPI snapshots (daily cache from Pine Supabase)
CREATE TABLE IF NOT EXISTS dashboard_kpi_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date date NOT NULL,
  mrr numeric DEFAULT 0,
  customer_count integer DEFAULT 0,
  booking_count integer DEFAULT 0,
  error_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_kpi_snapshot_date ON dashboard_kpi_snapshots(snapshot_date);
-- Dashboard finance snapshots (daily cache from freee API)
CREATE TABLE IF NOT EXISTS dashboard_finance_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date date NOT NULL,
  data_type text NOT NULL, -- walletables, trial_pl, trial_bs, deals_summary, employees
  payload jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_finance_snapshot ON dashboard_finance_snapshots(snapshot_date, data_type);
-- Dashboard daily reports
CREATE TABLE IF NOT EXISTS dashboard_daily_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_date date NOT NULL UNIQUE,
  product_md text,
  sales_md text,
  finance_md text,
  manual_note text,
  agent_summary_md text,
  created_at timestamptz DEFAULT now()
);
-- Dashboard agent metrics (daily cache)
CREATE TABLE IF NOT EXISTS dashboard_agent_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date date NOT NULL,
  agent_name text NOT NULL,
  invocation_count integer DEFAULT 0,
  success_count integer DEFAULT 0,
  error_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_agent_metrics ON dashboard_agent_metrics(snapshot_date, agent_name);
-- Allow anon read access for dashboard (protected by Vercel password)
ALTER TABLE dashboard_kpi_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_finance_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_agent_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read" ON dashboard_kpi_snapshots FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON dashboard_finance_snapshots FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON dashboard_daily_reports FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON dashboard_agent_metrics FOR SELECT USING (true);
-- Allow service_role to insert/update (for Edge Function cron)
CREATE POLICY "Allow service write" ON dashboard_kpi_snapshots FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow service write" ON dashboard_finance_snapshots FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow service write" ON dashboard_daily_reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow service write" ON dashboard_agent_metrics FOR ALL USING (true) WITH CHECK (true);
