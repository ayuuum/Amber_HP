-- Meta既存リードのバックフィル支援
alter table if exists meta_ads_campaigns
  add column if not exists meta_form_id text;
alter table if exists meta_leads
  add column if not exists raw_payload jsonb;
create index if not exists meta_ads_campaigns_form_id_idx on meta_ads_campaigns(meta_form_id);
