create table if not exists meta_performance_log (
  id            uuid primary key default gen_random_uuid(),
  campaign_id   text not null,
  campaign_name text not null,
  action        text not null,  -- 'paused', 'alerted'
  reason        text,
  cpa           numeric,
  leads         integer,
  spend         numeric,
  created_at    timestamptz not null default now()
);
create index if not exists meta_performance_log_campaign_idx on meta_performance_log(campaign_id);
create index if not exists meta_performance_log_created_at_idx on meta_performance_log(created_at desc);
