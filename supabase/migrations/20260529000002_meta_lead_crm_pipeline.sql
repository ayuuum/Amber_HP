-- Meta lead CRM pipeline metadata
alter table if exists meta_leads
  add column if not exists pipeline_scored_at timestamptz,
  add column if not exists hot_notified_at timestamptz,
  add column if not exists notion_page_id text,
  add column if not exists notion_url text;
create index if not exists meta_leads_pipeline_scored_at_idx on meta_leads(pipeline_scored_at desc);
create index if not exists meta_leads_hot_notified_at_idx on meta_leads(hot_notified_at desc);
create index if not exists meta_leads_notion_page_id_idx on meta_leads(notion_page_id);
