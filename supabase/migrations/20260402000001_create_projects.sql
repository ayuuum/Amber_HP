-- ============================================================================
-- Projects table: mid-to-long term project tracking
-- Tasks link to projects via project_id for automatic progress tracking
-- ============================================================================

create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status text not null default 'active',
    -- 'planning', 'active', 'paused', 'completed', 'archived'
  category text not null default 'dev',
    -- 'product' (Pine), 'client' (受託), 'internal' (社内), 'research' (リサーチ)
  deadline date,
  milestones jsonb default '[]'::jsonb,
    -- [{ "title": "見積もり提出", "due": "2026-04-05", "done": false }]
  keywords text[] default '{}',
    -- auto-linking keywords: e.g. ['Pine', '予約', 'booking']
    -- daily-ops-agent matches task titles against these
  color text default '#3b82f6',
    -- display color for dashboard
  progress int not null default 0,
    -- 0-100, auto-calculated from linked task completion rate
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- Auto-update updated_at
create trigger projects_updated_at
  before update on projects
  for each row execute function update_tasks_updated_at();
-- Add project_id to tasks table
alter table tasks add column project_id uuid references projects(id);
create index idx_tasks_project on tasks (project_id) where project_id is not null;
-- RLS
alter table projects enable row level security;
create policy "Service role full access on projects"
  on projects for all
  using (true)
  with check (true);
create policy "Anon read projects"
  on projects for select
  using (true);
-- Function to recalculate project progress from linked tasks
create or replace function recalculate_project_progress()
returns trigger as $$
declare
  proj_id uuid;
  total_count int;
  done_count int;
  new_progress int;
begin
  proj_id := coalesce(new.project_id, old.project_id);
  if proj_id is null then return new; end if;

  select count(*), count(*) filter (where status = 'done')
  into total_count, done_count
  from tasks
  where project_id = proj_id and status != 'dropped';

  if total_count > 0 then
    new_progress := round((done_count::numeric / total_count) * 100);
  else
    new_progress := 0;
  end if;

  update projects set progress = new_progress where id = proj_id;
  return new;
end;
$$ language plpgsql;
create trigger tasks_project_progress
  after insert or update of status, project_id or delete on tasks
  for each row execute function recalculate_project_progress();
