-- ============================================================
-- 業界キーワード管理
-- ============================================================
CREATE TABLE IF NOT EXISTS industry_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry text NOT NULL,
  category text NOT NULL CHECK (category IN ('fc', 'jutaku')),
  queries text[] NOT NULL DEFAULT '{}',
  source text NOT NULL DEFAULT 'initial',
  active boolean NOT NULL DEFAULT true,
  last_crawled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- ============================================================
-- ターゲット企業
-- ============================================================
CREATE TABLE IF NOT EXISTS outreach_targets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  parent_company text,
  industry text,
  category text CHECK (category IN ('fc', 'jutaku')),
  website_url text,
  contact_email text,
  contact_name text,
  estimated_stores int,
  company_size text,
  summary text,
  score int NOT NULL DEFAULT 0,

  source text NOT NULL DEFAULT 'auto_crawl',
  source_detail text,

  research_summary text,
  approach_subjects text[],
  approach_body text,
  approach_linkedin text,

  status text NOT NULL DEFAULT 'discovered'
    CHECK (status IN (
      'discovered', 'researched', 'approved', 'sent',
      'followed_up', 'replied', 'meeting',
      'closed_won', 'closed_lost', 'no_response', 'skipped'
    )),
  follow_up_count int NOT NULL DEFAULT 0,
  resend_message_id text,

  discovered_at timestamptz NOT NULL DEFAULT now(),
  researched_at timestamptz,
  approved_at timestamptz,
  sent_at timestamptz,
  followed_up_at timestamptz,
  replied_at timestamptz,

  created_at timestamptz NOT NULL DEFAULT now()
);
-- 重複チェック用インデックス
CREATE INDEX IF NOT EXISTS idx_outreach_targets_company ON outreach_targets (company_name);
CREATE INDEX IF NOT EXISTS idx_outreach_targets_website ON outreach_targets (website_url);
CREATE INDEX IF NOT EXISTS idx_outreach_targets_status ON outreach_targets (status);
CREATE INDEX IF NOT EXISTS idx_outreach_targets_score ON outreach_targets (score DESC);
-- ============================================================
-- 初期キーワード投入（6カテゴリ）
-- ============================================================
INSERT INTO industry_keywords (industry, category, queries, source) VALUES
  ('ハウスクリーニング', 'fc', ARRAY[
    'ハウスクリーニング フランチャイズ 本部 一覧',
    '清掃業 フランチャイズ 加盟店募集',
    'ハウスクリーニング 会社 ランキング'
  ], 'initial'),
  ('出張サービス', 'fc', ARRAY[
    '出張サービス フランチャイズ 一覧',
    '家事代行 フランチャイズ 本部',
    'エアコンクリーニング フランチャイズ'
  ], 'initial'),
  ('消防設備点検', 'jutaku', ARRAY[
    '消防設備点検 会社 一覧',
    '消防設備 保守 企業',
    '防災設備 メンテナンス 会社'
  ], 'initial'),
  ('不動産管理', 'jutaku', ARRAY[
    '不動産管理会社 一覧',
    '賃貸管理 会社 ランキング',
    'プロパティマネジメント 会社'
  ], 'initial'),
  ('電気工事', 'jutaku', ARRAY[
    '電気工事 会社 中堅',
    '電気設備 保守 メンテナンス 会社',
    '設備工事 フランチャイズ'
  ], 'initial'),
  ('訪問介護', 'jutaku', ARRAY[
    '訪問介護 フランチャイズ 本部',
    '在宅介護 会社 一覧',
    '介護サービス 企業 ランキング'
  ], 'initial');
