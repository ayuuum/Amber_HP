-- ==========================================================================
-- Finance + Governance 基盤
-- 2026-04-20 策定
-- 含むドメイン:
--   F. ファイナンス: invoices / invoice_items / recurring_costs /
--                    cash_projections / monthly_financials / finance_kpi_snapshots /
--                    pricing_playbook / pricing_history / debtor_watch / expense_rules
--   E. 戦略経営:    okrs / key_results / okr_checkins / decisions / decision_revisits
--   H. 法務:        contracts / contract_parties / access_credentials
--   I. ナレッジ:    documents_catalog
-- ==========================================================================

-- ---- F1. 請求書 -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,          -- INV-2026-0001 形式
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  business_line TEXT NOT NULL,                  -- pine / jutaku / training
  related_contract_id UUID,                     -- contracts への参照（任意）
  amount NUMERIC NOT NULL,
  tax NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC GENERATED ALWAYS AS (amount + tax) STORED,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','sent','paid','overdue','void')),
  issued_at DATE,
  due_at DATE,
  paid_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  pdf_url TEXT,
  freee_invoice_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_invoices_status_due ON invoices(status, due_at);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_name);
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  amount NUMERIC GENERATED ALWAYS AS (quantity * unit_price) STORED,
  tax_rate NUMERIC NOT NULL DEFAULT 0.10,
  sort_order INT DEFAULT 0
);
-- ---- F2. 督促運用 ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS invoice_dunning_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  level INT NOT NULL,                           -- 1/2/3
  channel TEXT NOT NULL,                        -- email/line/phone
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  outcome TEXT                                  -- paid/ignored/commented
);
-- ---- F3. 経費自動化ルール -------------------------------------------------
CREATE TABLE IF NOT EXISTS expense_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_pattern TEXT NOT NULL,               -- "Supabase" / "Vercel" / "JR東日本"
  account_title TEXT NOT NULL,                  -- 勘定科目
  sub_account TEXT,                             -- 補助科目
  tax_category TEXT,
  frequency TEXT,                               -- monthly/occasional
  hit_count INT DEFAULT 0,
  last_hit_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- ---- F4. 月次決算 ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS monthly_financials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month DATE NOT NULL UNIQUE,                   -- 月初日で表現 (2026-04-01)
  revenue_pine NUMERIC DEFAULT 0,
  revenue_jutaku NUMERIC DEFAULT 0,
  revenue_training NUMERIC DEFAULT 0,
  cogs NUMERIC DEFAULT 0,
  gross_profit NUMERIC DEFAULT 0,
  opex NUMERIC DEFAULT 0,
  operating_profit NUMERIC DEFAULT 0,
  cash_in NUMERIC DEFAULT 0,
  cash_out NUMERIC DEFAULT 0,
  cash_balance_end NUMERIC,
  accounts_receivable NUMERIC DEFAULT 0,
  accounts_payable NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- ---- F5. 資金繰り ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS recurring_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,                       -- infrastructure/saas/rent/payroll/...
  amount NUMERIC NOT NULL,
  frequency TEXT NOT NULL,                      -- monthly/quarterly/annual
  next_due DATE,
  active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS cash_projections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projection_run_at TIMESTAMPTZ DEFAULT NOW(),
  week_start DATE NOT NULL,
  cash_in NUMERIC NOT NULL DEFAULT 0,
  cash_out NUMERIC NOT NULL DEFAULT 0,
  balance NUMERIC NOT NULL DEFAULT 0,
  confidence TEXT DEFAULT 'medium'
    CHECK (confidence IN ('high','medium','low')),
  scenarios JSONB DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_cash_proj_week ON cash_projections(week_start);
-- ---- F7. 価格 -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pricing_playbook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  segment TEXT NOT NULL,
  service_type TEXT NOT NULL,                   -- pine/training/system_dev/consulting
  size_tier TEXT,                               -- 1-5 / 6-20 / 21-50 / 51+
  base_price NUMERIC NOT NULL,
  discount_floor NUMERIC,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS pricing_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_reference TEXT,
  segment TEXT,
  service_type TEXT,
  proposed_price NUMERIC,
  final_price NUMERIC,
  discount_reason TEXT,
  won BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- ---- F8. 与信 -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS debtor_watch (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL UNIQUE,
  risk_level TEXT DEFAULT 'low'
    CHECK (risk_level IN ('low','medium','high')),
  delayed_payment_count INT DEFAULT 0,
  last_delayed_at DATE,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- ---- F9. 財務KPIスナップショット ------------------------------------------
CREATE TABLE IF NOT EXISTS finance_kpi_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date DATE NOT NULL UNIQUE,
  mrr_pine NUMERIC,
  bookings_jutaku NUMERIC,
  churn_mrr NUMERIC,
  cac NUMERIC,
  ltv NUMERIC,
  gross_margin NUMERIC,
  burn NUMERIC,
  runway_months NUMERIC,
  cash_balance NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- ---- E2. OKR -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS okrs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period TEXT NOT NULL,                         -- "2026-Q2" / "2026-05"
  level TEXT NOT NULL
    CHECK (level IN ('company','business','personal')),
  owner TEXT NOT NULL,                          -- ayumu/pine/jutaku
  objective TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS key_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  okr_id UUID NOT NULL REFERENCES okrs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  metric_name TEXT,
  target_value NUMERIC,
  current_value NUMERIC,
  unit TEXT,
  update_source TEXT DEFAULT 'manual'
    CHECK (update_source IN ('manual','finance_kpi','product_kpi','custom_query')),
  query TEXT,                                   -- SQL クエリ（自動更新用）
  on_track BOOLEAN,
  last_updated_at TIMESTAMPTZ,
  sort_order INT DEFAULT 0
);
CREATE TABLE IF NOT EXISTS okr_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kr_id UUID NOT NULL REFERENCES key_results(id) ON DELETE CASCADE,
  checkin_date DATE NOT NULL DEFAULT CURRENT_DATE,
  value NUMERIC,
  on_track BOOLEAN,
  note TEXT,
  created_by TEXT DEFAULT 'ayumu',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- ---- E4. 意思決定ログ -----------------------------------------------------
CREATE TABLE IF NOT EXISTS decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decided_at DATE NOT NULL DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  context TEXT,
  options_considered JSONB DEFAULT '[]'::jsonb,
  decision TEXT NOT NULL,
  reasoning TEXT,
  who_decided TEXT DEFAULT 'ayumu',
  confidence TEXT DEFAULT 'medium'
    CHECK (confidence IN ('high','medium','low')),
  revisit_at DATE,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  linked_documents TEXT[],
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active','superseded','reverted')),
  superseded_by UUID REFERENCES decisions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_decisions_tags ON decisions USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_decisions_revisit ON decisions(revisit_at)
  WHERE revisit_at IS NOT NULL AND status = 'active';
CREATE TABLE IF NOT EXISTS decision_revisits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id UUID NOT NULL REFERENCES decisions(id) ON DELETE CASCADE,
  revisit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  still_valid BOOLEAN,
  notes TEXT,
  new_decision_id UUID REFERENCES decisions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- ---- H1-H2. 契約台帳 -----------------------------------------------------
CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  counterparty_name TEXT NOT NULL,
  counterparty_email TEXT,
  type TEXT NOT NULL
    CHECK (type IN ('nda','service','partnership','employment','vendor','saas','other')),
  direction TEXT NOT NULL DEFAULT 'outbound'
    CHECK (direction IN ('outbound','inbound','mutual')),  -- 発行/受領/相互
  signed_at DATE,
  effective_at DATE,
  expires_at DATE,
  auto_renewal BOOLEAN DEFAULT false,
  notice_period_days INT,
  amount NUMERIC,
  payment_terms TEXT,
  status TEXT DEFAULT 'active'
    CHECK (status IN ('draft','active','expired','terminated')),
  file_url TEXT,
  summary TEXT,
  key_clauses JSONB DEFAULT '{}'::jsonb,       -- {scope_out, liability_cap, confidentiality_years}
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_contracts_expires ON contracts(expires_at)
  WHERE expires_at IS NOT NULL AND status = 'active';
CREATE INDEX IF NOT EXISTS idx_contracts_type ON contracts(type, status);
-- ---- H5. アクセス権限台帳 ------------------------------------------------
CREATE TABLE IF NOT EXISTS access_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,                   -- Supabase/Vercel/freee/GitHub/Lovable...
  account_email TEXT,
  account_identifier TEXT,                      -- user id / organization / etc.
  role TEXT
    CHECK (role IN ('owner','admin','member','viewer','unknown')),
  granted_to TEXT NOT NULL DEFAULT 'ayumu',     -- ayumu / 業務委託A / contractor-xxx
  mfa_enabled BOOLEAN DEFAULT false,
  last_reviewed_at DATE,
  active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_credentials_service ON access_credentials(service_name, granted_to);
-- ---- I1. ドキュメント目録 ------------------------------------------------
CREATE TABLE IF NOT EXISTS documents_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL UNIQUE,                    -- 相対パス or URL
  title TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active','archived','draft')),
  owner TEXT DEFAULT 'ayumu',
  summary TEXT,
  last_modified_at TIMESTAMPTZ,
  scan_updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_documents_tags ON documents_catalog USING GIN (tags);
-- ==========================================================================
-- RLS (本番運用は個別に調整。ダッシュボードはservice-roleで直接読む前提)
-- ==========================================================================
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_dunning_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_projections ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_playbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE debtor_watch ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_kpi_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE okrs ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE okr_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_revisits ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents_catalog ENABLE ROW LEVEL SECURITY;
-- service_role からのフルアクセスを全テーブルに許可
-- NOTE: PostgreSQL の CREATE POLICY は IF NOT EXISTS 非対応なので DROP → CREATE 方式
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT unnest(ARRAY[
      'invoices','invoice_items','invoice_dunning_logs','expense_rules',
      'monthly_financials','recurring_costs','cash_projections',
      'pricing_playbook','pricing_history','debtor_watch','finance_kpi_snapshots',
      'okrs','key_results','okr_checkins','decisions','decision_revisits',
      'contracts','access_credentials','documents_catalog'
    ])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "service_role_all" ON %I', tbl);
    EXECUTE format(
      'CREATE POLICY "service_role_all" ON %I FOR ALL TO service_role USING (true) WITH CHECK (true)',
      tbl
    );
  END LOOP;
END $$;
-- ==========================================================================
-- 更新タイムスタンプ用トリガー
-- ==========================================================================
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_invoices_updated BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_contracts_updated BEFORE UPDATE ON contracts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_credentials_updated BEFORE UPDATE ON access_credentials
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
