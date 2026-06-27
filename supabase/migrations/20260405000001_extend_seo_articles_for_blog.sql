-- Extend seo_articles with blog content columns (Single Source of Truth)
-- This eliminates the need for a separate blog_articles table

ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS content_md TEXT;
ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS cover_image_url TEXT;
ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS reading_time_min INT;
ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS cta_type TEXT DEFAULT 'line-diagnosis';
ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS structured_data JSONB;
ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT '松井歩武';
ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
-- Category master table
CREATE TABLE IF NOT EXISTS blog_categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0
);
-- Initial category data
INSERT INTO blog_categories (slug, name, description, display_order) VALUES
  ('customer-acquisition', '集客ノウハウ', 'マケプレに頼らない集客方法を実践的に解説', 1),
  ('marketplace-exit', 'マケプレ脱却', 'くらしのマーケット依存からの脱却戦略', 2),
  ('management', '経営改善', '清掃事業の経営効率化・利益改善', 3),
  ('pine-case-study', 'Pine活用事例', 'Pine導入事業者のリアルな成果', 4)
ON CONFLICT (slug) DO NOTHING;
-- RLS: published articles are public (read-only via anon key)
ALTER TABLE seo_articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Published articles are public" ON seo_articles;
CREATE POLICY "Published articles are public" ON seo_articles
  FOR SELECT
  USING (status = 'published');
DROP POLICY IF EXISTS "Service role has full access to seo_articles" ON seo_articles;
CREATE POLICY "Service role has full access to seo_articles" ON seo_articles
  FOR ALL
  USING (auth.role() = 'service_role');
-- RLS for blog_categories: public read
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are public" ON blog_categories
  FOR SELECT
  USING (true);
CREATE POLICY "Service role has full access to blog_categories" ON blog_categories
  FOR ALL
  USING (auth.role() = 'service_role');
-- Indexes for blog queries
CREATE INDEX IF NOT EXISTS idx_seo_articles_published ON seo_articles(status, publish_date DESC)
  WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_seo_articles_category ON seo_articles(category);
CREATE INDEX IF NOT EXISTS idx_seo_articles_slug ON seo_articles(slug);
