-- Tracks which calendar events have already received an imminent-meeting briefing,
-- so cos-imminent-meeting (running every 5 minutes) doesn't double-notify.

create table if not exists meeting_briefings_sent (
  event_id text primary key,
  event_summary text not null,
  meeting_start timestamptz not null,
  sent_at timestamptz not null default now()
);
create index if not exists meeting_briefings_sent_meeting_start_idx
  on meeting_briefings_sent (meeting_start);
-- Auto-clean rows older than 30 days (cron will rely on this for hygiene).
-- We keep 30 days for audit/debug, then drop.
create or replace function prune_meeting_briefings_sent()
returns void
language sql
as $$
  delete from meeting_briefings_sent where sent_at < now() - interval '30 days';
$$;
