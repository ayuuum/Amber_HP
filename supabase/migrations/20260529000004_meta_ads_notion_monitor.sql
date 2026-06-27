-- Notion monitoring metadata for Meta ads campaigns.
alter table if exists meta_ads_campaigns
  add column if not exists notion_monitor_page_id text,
  add column if not exists notion_monitor_url text,
  add column if not exists notion_monitor_synced_at timestamptz;
create index if not exists meta_ads_campaigns_notion_monitor_page_idx on meta_ads_campaigns(notion_monitor_page_id);
create index if not exists meta_ads_campaigns_notion_monitor_synced_at_idx on meta_ads_campaigns(notion_monitor_synced_at desc);
