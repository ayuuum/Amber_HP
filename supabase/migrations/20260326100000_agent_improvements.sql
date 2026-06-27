-- Agent Infrastructure Improvements
-- 1. company_research_cache: cache Firecrawl/Exa research to avoid redundant API calls
-- 2. pipeline_events: track entity progression through sales/product pipeline

-- =============================================================================
-- company_research_cache
-- =============================================================================

CREATE TABLE IF NOT EXISTS company_research_cache (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  website_url text,
  query text NOT NULL,
  source text NOT NULL, -- 'firecrawl' | 'exa'
  result_md text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT now() + interval '24 hours'
);
CREATE INDEX idx_research_cache_company ON company_research_cache(company_name);
CREATE INDEX idx_research_cache_expires ON company_research_cache(expires_at);
ALTER TABLE company_research_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_full_access_research_cache"
  ON company_research_cache
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "anon_select_research_cache"
  ON company_research_cache
  FOR SELECT
  USING (auth.role() = 'anon');
-- =============================================================================
-- pipeline_events
-- =============================================================================

CREATE TABLE IF NOT EXISTS pipeline_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type text NOT NULL, -- 'outreach_target' | 'lead' | 'company'
  entity_id uuid NOT NULL,
  stage text NOT NULL, -- 'discovered' | 'researched' | 'approached' | 'sent' | 'replied' | 'meeting' | 'closed_won' | 'closed_lost'
  agent_name text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_pipeline_entity ON pipeline_events(entity_type, entity_id);
CREATE INDEX idx_pipeline_stage ON pipeline_events(stage);
CREATE INDEX idx_pipeline_created ON pipeline_events(created_at);
ALTER TABLE pipeline_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_full_access_pipeline"
  ON pipeline_events
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "anon_select_pipeline"
  ON pipeline_events
  FOR SELECT
  USING (auth.role() = 'anon');
