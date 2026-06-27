-- Enable RLS (if not already)
ALTER TABLE outreach_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_keywords ENABLE ROW LEVEL SECURITY;
-- anon can SELECT outreach_targets (dashboard read)
CREATE POLICY anon_select_outreach_targets ON outreach_targets
  FOR SELECT TO anon USING (true);
-- anon can SELECT industry_keywords
CREATE POLICY anon_select_industry_keywords ON industry_keywords
  FOR SELECT TO anon USING (true);
-- service_role can do everything (Edge Functions use service_role)
CREATE POLICY service_all_outreach_targets ON outreach_targets
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY service_all_industry_keywords ON industry_keywords
  FOR ALL TO service_role USING (true) WITH CHECK (true);
