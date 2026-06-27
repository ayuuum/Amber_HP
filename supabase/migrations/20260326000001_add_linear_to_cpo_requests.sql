-- cpo_requestsにLinear Issue情報を追加
alter table public.cpo_requests
  add column if not exists linear_issue_url text,
  add column if not exists linear_issue_id text;
-- Linear identifier (e.g. HAA-325);
