-- SEO article tracking with performance metrics
create table if not exists seo_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  publish_date date not null,
  status text not null default 'draft' check (status in ('draft', 'approved', 'published', 'skipped')),
  article_type text, -- story / industry / comparison / howto / data
  keywords text[], -- target keywords used

  -- Performance metrics (updated by weekly cron)
  clicks integer default 0,
  impressions integer default 0,
  avg_position numeric(5,1),
  ctr numeric(5,2),
  last_performance_check date,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
-- Index for performance queries
create index if not exists idx_seo_articles_status on seo_articles(status);
create index if not exists idx_seo_articles_publish_date on seo_articles(publish_date desc);
