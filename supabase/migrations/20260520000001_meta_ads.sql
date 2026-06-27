-- Pine Meta広告キャンペーン管理テーブル
create table if not exists meta_ads_campaigns (
  id                uuid primary key default gen_random_uuid(),
  campaign_name     text not null,
  objective         text not null default 'OUTCOME_TRAFFIC',
  daily_budget_jpy  integer not null default 3000,
  targeting_summary text,
  targeting_spec    jsonb,
  ad_copies         jsonb,                -- array of {name, headline, body, cta}
  landing_url       text,
  status            text not null default 'pending'
                      check (status in ('pending', 'approved', 'rejected', 'active', 'error')),
  meta_campaign_id  text,
  meta_adset_id     text,
  meta_ad_ids       jsonb,               -- array of Meta Ad IDs
  error_message     text,
  created_at        timestamptz not null default now(),
  approved_at       timestamptz
);
-- Dashboard query index
create index if not exists meta_ads_campaigns_status_idx on meta_ads_campaigns(status);
create index if not exists meta_ads_campaigns_created_at_idx on meta_ads_campaigns(created_at desc);
