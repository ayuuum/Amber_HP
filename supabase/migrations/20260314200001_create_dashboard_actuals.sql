-- Actuals table: freee income → monthly revenue actuals for yosan page
CREATE TABLE IF NOT EXISTS dashboard_actuals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,
  fiscal_year INTEGER NOT NULL,
  total INTEGER DEFAULT 0,
  pine INTEGER DEFAULT 0,
  hp_meo INTEGER DEFAULT 0,
  jutaku_project INTEGER DEFAULT 0,
  jutaku_maintenance INTEGER DEFAULT 0,
  new_saas INTEGER DEFAULT 0,
  raw_deals INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(month, fiscal_year)
);
ALTER TABLE dashboard_actuals ENABLE ROW LEVEL SECURITY;
