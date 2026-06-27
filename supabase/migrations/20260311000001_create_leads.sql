-- leads テーブル
-- Amber全事業のリード管理（Pine新規事業者 / AI受託）

create table public.leads (
  id uuid primary key default gen_random_uuid(),

  -- 基本情報（フォームから）
  name text not null,
  company text,
  email text not null,
  phone text,
  inquiry_type text not null default 'general', -- general | demo | consulting | service
  message text,

  -- リードの分類
  source text not null default 'hp_form', -- hp_form | email_reply | meishi | instagram | phone
  business text, -- pine | ai_consulting | unknown

  -- ステータス
  status text not null default 'new', -- new | contacted | meeting_set | proposal | closed | lost

  -- AIリサーチ結果
  company_research jsonb, -- Firecrawl + Exa.ai の結果

  -- AI生成の返信
  ai_reply text,

  -- 対応記録
  notes text,
  meeting_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- updated_at 自動更新
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.update_updated_at();
-- RLS
alter table public.leads enable row level security;
-- service_roleのみアクセス可（Edgefunctionから操作）
create policy "service_role only" on public.leads
  using (auth.role() = 'service_role');
