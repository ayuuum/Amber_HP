-- Contact form persistence table for Amber HP.
-- Run this in the Supabase SQL Editor.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'hp_form',
  source_page text,
  referrer_path text,
  name text not null,
  company text,
  email text not null,
  phone text,
  inquiry_type text not null,
  inquiry_label text not null,
  message text not null,
  status text not null default 'new',
  handled_at timestamptz,
  notes text,

  constraint contact_submissions_email_check
    check (position('@' in email) > 1),
  constraint contact_submissions_status_check
    check (status in ('new', 'triaged', 'contacted', 'closed', 'spam')),
  constraint contact_submissions_inquiry_type_check
    check (
      inquiry_type in (
        'development',
        'training',
        'pine',
        'demo',
        'partnership',
        'recruiting',
        'general'
      )
    )
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

create index if not exists contact_submissions_inquiry_type_idx
  on public.contact_submissions (inquiry_type);

alter table public.contact_submissions enable row level security;

-- The website API inserts with SUPABASE_SERVICE_ROLE_KEY.
-- Do not expose the service role key in browser code.
