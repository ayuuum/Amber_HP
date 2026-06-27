-- ============================================================================
-- Agentic Task Management: tasks テーブル
-- Ayumu が #ops に雑に書く → ops-listener が構造化 → Agent実行 or スケジューリング
-- ============================================================================

create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null default 'ops',
    -- 'dev', 'sales', 'admin', 'private', 'ops'
  priority text not null default 'medium',
    -- 'urgent', 'high', 'medium', 'low'
  status text not null default 'open',
    -- 'open', 'in_progress', 'delegated', 'done', 'dropped'

  -- Agentic: タスクの実行方法
  execution_type text not null default 'human',
    -- 'human' = Ayumuがやる, 'agent' = Agent実行, 'hybrid' = Agent準備→Ayumu判断
  delegated_to text,
    -- Agent名 ('sdr-research', 'cso-draft', 'ai-implement', etc.)
  agent_result text,
    -- Agent実行結果のサマリー

  -- ソース追跡
  source text not null default 'slack',
    -- 'slack', 'cpo', 'sentry', 'email', 'calendar', 'manual'
  source_url text,
    -- Slack permalink, GitHub Issue URL, etc.
  slack_message_ts text,
    -- Slack メッセージのts（完了検知用）

  -- スケジューリング
  due_date date,
  time_estimate_min int,
  scheduled_date date,
    -- daily-ops-agentが配置した日
  calendar_event_id text,
    -- Google Calendar に作成したイベントのID

  -- 繰り越し追跡
  original_date date,
    -- 最初にスケジュールされた日（繰り越し回数 = scheduled_date - original_date）
  carry_over_count int not null default 0,

  -- タイムスタンプ
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  dropped_at timestamptz,
  updated_at timestamptz not null default now()
);
-- インデックス
create index idx_tasks_status on tasks (status) where status in ('open', 'in_progress', 'delegated');
create index idx_tasks_scheduled on tasks (scheduled_date) where status = 'open';
create index idx_tasks_due on tasks (due_date) where status in ('open', 'in_progress');
create index idx_tasks_stale on tasks (created_at) where status = 'open';
-- updated_at 自動更新トリガー
create or replace function update_tasks_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;
create trigger tasks_updated_at
  before update on tasks
  for each row execute function update_tasks_updated_at();
-- RLS
alter table tasks enable row level security;
create policy "Service role full access on tasks"
  on tasks for all
  using (true)
  with check (true);
create policy "Anon read tasks"
  on tasks for select
  using (true);
