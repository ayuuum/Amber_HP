-- Proposals table for the proposal generation app
CREATE TABLE IF NOT EXISTS proposals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  industry text,
  company_size text,
  status text NOT NULL DEFAULT 'pending',
  error_message text,
  research_raw jsonb,
  research_summary text,
  ceo_message text,
  connection_point text,
  use_cases jsonb,
  proposal_html text,
  approach_email_subject text,
  approach_email_body text,
  approach_dm text,
  approach_phone_script text,
  sent_at timestamptz,
  sent_method text,
  sent_to text,
  reaction text DEFAULT 'none',
  reaction_at timestamptz,
  reaction_note text,
  deal_amount integer,
  created_by text DEFAULT 'friend',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
-- Index for listing
CREATE INDEX IF NOT EXISTS idx_proposals_created_at ON proposals (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals (status);
