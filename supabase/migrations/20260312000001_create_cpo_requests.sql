-- cpo_requests テーブル
-- CPO Agentが処理した要望・バグ報告の記録

create table public.cpo_requests (
  id uuid primary key default gen_random_uuid(),

  -- 元の要望
  category text not null, -- bug | feature
  user_message text not null,
  line_user_id text not null,
  support_message_id uuid, -- pine-support-agentのsupport_messages.id

  -- CPO Agentが生成した仕様書
  spec_title text,
  spec_body text,
  priority text, -- high | medium | low
  should_implement boolean default true,
  reject_reason text,

  -- Ayumuの判断
  status text not null default 'pending', -- pending | approved | rejected

  -- 承認後のGitHub Issue
  github_issue_url text,
  github_issue_number integer,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger cpo_requests_updated_at
  before update on public.cpo_requests
  for each row execute function public.update_updated_at();
alter table public.cpo_requests enable row level security;
create policy "service_role only" on public.cpo_requests
  using (auth.role() = 'service_role');
