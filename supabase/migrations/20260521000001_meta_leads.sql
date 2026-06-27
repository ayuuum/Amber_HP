-- Meta Instant Form リード管理テーブル
create table if not exists meta_leads (
  id              uuid primary key default gen_random_uuid(),
  leadgen_id      text unique not null,   -- Meta のリードID（重複防止）
  page_id         text,
  ad_id           text,
  form_id         text,
  full_name       text not null,
  email           text not null,
  phone           text,
  company         text,
  raw_fields      jsonb,                  -- フォームの全フィールド
  auto_reply_sent boolean not null default false,
  replied_at      timestamptz,
  created_at      timestamptz not null default now()
);
create index if not exists meta_leads_email_idx on meta_leads(email);
create index if not exists meta_leads_created_at_idx on meta_leads(created_at desc);
create index if not exists meta_leads_ad_id_idx on meta_leads(ad_id);
