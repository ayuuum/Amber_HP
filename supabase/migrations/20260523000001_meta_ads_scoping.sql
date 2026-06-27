-- Pine Meta広告の監視スコープ追加
alter table if exists meta_ads_campaigns
  add column if not exists scope text not null default 'pine';
update meta_ads_campaigns
set scope = coalesce(scope, 'pine')
where scope is null;
alter table if exists meta_leads
  add column if not exists campaign_id text,
  add column if not exists campaign_name text,
  add column if not exists ad_name text,
  add column if not exists reply_variant text not null default 'default';
create index if not exists meta_ads_campaigns_scope_idx on meta_ads_campaigns(scope);
create index if not exists meta_leads_campaign_id_idx on meta_leads(campaign_id);
create index if not exists meta_leads_reply_variant_idx on meta_leads(reply_variant);
