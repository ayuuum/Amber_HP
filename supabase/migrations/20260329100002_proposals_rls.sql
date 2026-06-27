-- Enable RLS on proposals table
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
-- Allow anon role to read all proposals (frontend reads via anon key)
CREATE POLICY "Allow anon read proposals"
  ON proposals FOR SELECT
  TO anon
  USING (true);
-- Allow anon role to update proposals (for sent/reaction tracking)
CREATE POLICY "Allow anon update proposals"
  ON proposals FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
-- Allow service_role full access (Edge Functions use service_role key)
CREATE POLICY "Allow service_role full access"
  ON proposals FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
