-- Keep campaign lifecycle in DB aligned with Meta automation actions.
alter table if exists meta_ads_campaigns
  drop constraint if exists meta_ads_campaigns_status_check;
alter table if exists meta_ads_campaigns
  add constraint meta_ads_campaigns_status_check
  check (status in ('pending', 'approved', 'rejected', 'active', 'paused', 'error'));
