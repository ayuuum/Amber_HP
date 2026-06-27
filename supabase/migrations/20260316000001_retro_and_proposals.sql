-- Phase 3: Add approval/rejection tracking to agent_metrics
ALTER TABLE dashboard_agent_metrics
  ADD COLUMN IF NOT EXISTS approval_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rejection_count integer DEFAULT 0;
-- Phase 3: Weekly retro snapshots
CREATE TABLE IF NOT EXISTS agent_retro_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start date NOT NULL,
  week_end date NOT NULL,
  agent_name text NOT NULL,
  invocations integer DEFAULT 0,
  successes integer DEFAULT 0,
  errors integer DEFAULT 0,
  approvals integer DEFAULT 0,
  rejections integer DEFAULT 0,
  approval_rate numeric,
  custom_metrics jsonb DEFAULT '{}',
  improvement_suggestions text[],
  created_at timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_retro_week_agent
  ON agent_retro_snapshots (week_start, agent_name);
ALTER TABLE agent_retro_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon can read retro snapshots"
  ON agent_retro_snapshots FOR SELECT TO anon USING (true);
CREATE POLICY "service_role full access retro"
  ON agent_retro_snapshots FOR ALL TO service_role USING (true) WITH CHECK (true);
-- Phase 5: Program update proposals
CREATE TABLE IF NOT EXISTS program_update_proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  current_program_md text NOT NULL,
  proposed_program_md text NOT NULL,
  reasoning text NOT NULL,
  metrics_summary jsonb DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE program_update_proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role full access proposals"
  ON program_update_proposals FOR ALL TO service_role USING (true) WITH CHECK (true);
