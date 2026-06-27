-- Scout Agent: 新規事業探索テーブル群

-- 発見した業界
CREATE TABLE scout_industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,                           -- 住まい/安全/設備/衛生/生活支援/健康/暮らしの維持/移動・配送/車/衣類/節目
  description TEXT,
  discovery_channel TEXT NOT NULL,         -- news/adjacent/manual
  discovery_reason TEXT,
  source_urls TEXT[] DEFAULT '{}',
  initial_signals JSONB DEFAULT '{}',
  status TEXT DEFAULT 'new',               -- new/researching/scored/watching/active/archived
  parent_industry_id UUID REFERENCES scout_industries(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
-- リサーチ結果
CREATE TABLE scout_research (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id UUID NOT NULL REFERENCES scout_industries(id) ON DELETE CASCADE,
  research_data JSONB NOT NULL,
  researched_at TIMESTAMPTZ DEFAULT now()
);
-- スコア履歴
CREATE TABLE scout_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id UUID NOT NULL REFERENCES scout_industries(id) ON DELETE CASCADE,
  scores JSONB NOT NULL,                   -- 各軸のスコアと理由
  total_score NUMERIC NOT NULL,
  rank TEXT NOT NULL,                      -- S/A/B/C
  recommended_action TEXT NOT NULL,        -- go/watch/skip
  ai_verdict TEXT,
  scored_at TIMESTAMPTZ DEFAULT now()
);
-- Ayumuの判断ログ
CREATE TABLE scout_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id UUID NOT NULL REFERENCES scout_industries(id) ON DELETE CASCADE,
  decision TEXT NOT NULL,                  -- go/watch/skip
  ayumu_reason TEXT,
  decided_at TIMESTAMPTZ DEFAULT now()
);
-- ニュース・シグナル
CREATE TABLE scout_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id UUID REFERENCES scout_industries(id) ON DELETE SET NULL,
  signal_type TEXT NOT NULL,               -- news/competitor/regulation/market
  title TEXT NOT NULL,
  summary TEXT,
  source_url TEXT,
  impact TEXT,                             -- positive/negative/neutral
  detected_at TIMESTAMPTZ DEFAULT now()
);
-- RLS
ALTER TABLE scout_industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE scout_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE scout_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE scout_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scout_signals ENABLE ROW LEVEL SECURITY;
-- service_role can do everything
CREATE POLICY "service_role_all" ON scout_industries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON scout_research FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON scout_scores FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON scout_decisions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON scout_signals FOR ALL USING (true) WITH CHECK (true);
-- anon can read (for dashboard)
CREATE POLICY "anon_select" ON scout_industries FOR SELECT USING (true);
CREATE POLICY "anon_select" ON scout_scores FOR SELECT USING (true);
CREATE POLICY "anon_select" ON scout_signals FOR SELECT USING (true);
