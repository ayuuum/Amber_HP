-- Repair columns added after 20260523000001 had already been applied remotely.
alter table if exists meta_leads
  add column if not exists sent_subject text,
  add column if not exists sent_text text,
  add column if not exists sent_html text,
  add column if not exists sent_at timestamptz;
create index if not exists meta_leads_sent_at_idx on meta_leads(sent_at desc);
