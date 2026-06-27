-- AI Auto-Implement metrics tracking
CREATE TABLE ai_implement_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_number INT NOT NULL,
  issue_title TEXT,
  issue_labels TEXT[],
  files_changed TEXT[],
  lines_added INT,
  lines_removed INT,
  test_attempts INT,
  test_passed BOOLEAN,
  review_rounds INT,
  review_passed BOOLEAN,
  auto_merged BOOLEAN DEFAULT false,
  total_duration_sec INT,
  failure_reasons TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_ai_implement_metrics_created ON ai_implement_metrics(created_at);
CREATE INDEX idx_ai_implement_metrics_issue ON ai_implement_metrics(issue_number);
ALTER TABLE ai_implement_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow service role full access" ON ai_implement_metrics
  FOR ALL USING (true) WITH CHECK (true);
