-- ============================================================
-- Workshop tables for training/workshop business
-- ============================================================

-- 案件管理
CREATE TABLE IF NOT EXISTS workshop_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text,
  contact_email text,
  industry text,
  company_size text, -- large / medium / small
  it_environment jsonb, -- {"copilot": true, "power_platform": true, ...}
  participant_count int DEFAULT 10,
  session_count int DEFAULT 16,
  hours_per_session numeric DEFAULT 2,
  monthly_fee numeric,
  total_fee numeric,
  subsidy_rate numeric DEFAULT 0.60,
  wage_subsidy_per_hour numeric DEFAULT 480,
  subsidy_amount numeric,
  actual_cost numeric,
  tier text DEFAULT 'standard', -- entry / standard / premium
  status text DEFAULT 'proposed', -- proposed → contracted → active → completed → followup
  start_date date,
  end_date date,
  company_research jsonb,
  curriculum jsonb,
  proposal_html text,
  source text, -- hp_form / sdr / referral / manual
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
-- 各回の記録
CREATE TABLE IF NOT EXISTS workshop_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES workshop_projects(id) ON DELETE CASCADE,
  session_number int NOT NULL,
  scheduled_date date,
  status text DEFAULT 'scheduled', -- scheduled → reminded → completed → cancelled
  attendance_count int,
  topic text,
  notes text,
  progress_report text,
  reminder_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
-- RLS
ALTER TABLE workshop_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all_workshop_projects" ON workshop_projects
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_workshop_sessions" ON workshop_sessions
  FOR ALL USING (true) WITH CHECK (true);
-- Index
CREATE INDEX idx_workshop_projects_status ON workshop_projects(status);
CREATE INDEX idx_workshop_sessions_project ON workshop_sessions(project_id);
CREATE INDEX idx_workshop_sessions_date ON workshop_sessions(scheduled_date);
