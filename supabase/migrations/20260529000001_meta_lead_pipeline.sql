-- Turn Meta Lead Ads records into a lightweight sales pipeline.
alter table if exists meta_leads
  add column if not exists status text not null default 'new',
  add column if not exists score integer not null default 50,
  add column if not exists score_reason text,
  add column if not exists last_contacted_at timestamptz,
  add column if not exists qualified_at timestamptz,
  add column if not exists meeting_booked_at timestamptz,
  add column if not exists won_at timestamptz,
  add column if not exists lost_at timestamptz;
alter table if exists meta_leads
  drop constraint if exists meta_leads_status_check;
alter table if exists meta_leads
  add constraint meta_leads_status_check
  check (status in ('new', 'contacted', 'qualified', 'meeting_booked', 'unqualified', 'won', 'lost'));
create index if not exists meta_leads_status_idx on meta_leads(status);
create index if not exists meta_leads_score_idx on meta_leads(score desc);
create index if not exists meta_leads_last_contacted_at_idx on meta_leads(last_contacted_at desc);
