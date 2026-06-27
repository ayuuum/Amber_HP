-- ==========================================================================
-- Company Context Layer
-- 2026-04-21
--
-- 全Agent が "今の Amber 状態" を 1 RPC で取得できる基盤。
-- 5 セクション: financial / pipeline / product / ops / strategic
-- ==========================================================================

-- ---- Section 1: Financial ------------------------------------------------
CREATE OR REPLACE VIEW v_financial_state AS
WITH latest_cash AS (
  SELECT balance, projection_run_at
  FROM cash_projections
  ORDER BY projection_run_at DESC, week_start ASC
  LIMIT 1
),
latest_kpi AS (
  SELECT mrr_pine, runway_months, burn, cash_balance, gross_margin
  FROM finance_kpi_snapshots
  ORDER BY snapshot_date DESC
  LIMIT 1
),
unpaid AS (
  SELECT
    COUNT(*) AS cnt,
    COALESCE(SUM(total), 0) AS sum_total,
    COUNT(*) FILTER (WHERE due_at < CURRENT_DATE) AS overdue_cnt
  FROM invoices
  WHERE status IN ('sent','overdue')
),
draft AS (
  SELECT COUNT(*) AS cnt, COALESCE(SUM(total), 0) AS sum_total
  FROM invoices
  WHERE status = 'draft'
    AND issued_at >= date_trunc('month', CURRENT_DATE)::date
),
paid_this_month AS (
  SELECT COALESCE(SUM(total), 0) AS sum_total
  FROM invoices
  WHERE status = 'paid'
    AND paid_at >= date_trunc('month', CURRENT_DATE)
)
SELECT jsonb_build_object(
  'cash_balance', COALESCE((SELECT cash_balance FROM latest_kpi),
                            (SELECT balance FROM latest_cash), 0),
  'runway_months', COALESCE((SELECT runway_months FROM latest_kpi), null),
  'mrr_pine', COALESCE((SELECT mrr_pine FROM latest_kpi), 0),
  'gross_margin', COALESCE((SELECT gross_margin FROM latest_kpi), null),
  'burn', COALESCE((SELECT burn FROM latest_kpi), null),
  'unpaid_invoices', jsonb_build_object(
    'count', (SELECT cnt FROM unpaid),
    'total', (SELECT sum_total FROM unpaid),
    'overdue_count', (SELECT overdue_cnt FROM unpaid)
  ),
  'unbilled_this_month', jsonb_build_object(
    'count', (SELECT cnt FROM draft),
    'estimated', (SELECT sum_total FROM draft)
  ),
  'paid_this_month', (SELECT sum_total FROM paid_this_month)
) AS state;
-- ---- Section 2: Pipeline -------------------------------------------------
-- leads / workshops / cpo_requests 等の集計
-- leads.status: new | contacted | meeting_set | proposal | closed | lost
-- cpo_requests.category: bug | feature / status: pending | approved | rejected
CREATE OR REPLACE VIEW v_pipeline_state AS
WITH leads_agg AS (
  SELECT
    COUNT(*) FILTER (WHERE status = 'new') AS new_cnt,
    COUNT(*) FILTER (WHERE status = 'contacted') AS contacted_cnt,
    COUNT(*) FILTER (WHERE status = 'meeting_set') AS booked_cnt,
    COUNT(*) FILTER (WHERE status = 'proposal') AS proposal_cnt,
    COUNT(*) FILTER (WHERE status = 'closed') AS won_cnt,
    COUNT(*) FILTER (WHERE status = 'lost') AS lost_cnt,
    COUNT(*) FILTER (WHERE business = 'pine') AS pine_leads,
    COUNT(*) FILTER (WHERE business = 'ai_consulting') AS jutaku_leads
  FROM leads
),
workshop_agg AS (
  SELECT
    COUNT(*) FILTER (WHERE status = 'proposed') AS proposed_cnt,
    COUNT(*) FILTER (WHERE status = 'contracted') AS contracted_cnt,
    COUNT(*) FILTER (WHERE status = 'active') AS active_cnt,
    COUNT(*) FILTER (WHERE status = 'completed') AS completed_cnt,
    COUNT(*) FILTER (WHERE status = 'followup') AS followup_cnt
  FROM workshop_projects
),
cpo_agg AS (
  SELECT
    COUNT(*) FILTER (WHERE category = 'bug' AND status = 'pending') AS bugs_pending,
    COUNT(*) FILTER (WHERE category = 'bug' AND status = 'approved') AS bugs_approved,
    COUNT(*) FILTER (WHERE category = 'feature' AND status = 'pending') AS features_pending
  FROM cpo_requests
)
SELECT jsonb_build_object(
  'leads', jsonb_build_object(
    'new', COALESCE((SELECT new_cnt FROM leads_agg), 0),
    'contacted', COALESCE((SELECT contacted_cnt FROM leads_agg), 0),
    'booked', COALESCE((SELECT booked_cnt FROM leads_agg), 0),
    'proposal', COALESCE((SELECT proposal_cnt FROM leads_agg), 0),
    'won', COALESCE((SELECT won_cnt FROM leads_agg), 0),
    'lost', COALESCE((SELECT lost_cnt FROM leads_agg), 0),
    'by_business', jsonb_build_object(
      'pine', COALESCE((SELECT pine_leads FROM leads_agg), 0),
      'jutaku', COALESCE((SELECT jutaku_leads FROM leads_agg), 0)
    )
  ),
  'workshops', jsonb_build_object(
    'proposed', COALESCE((SELECT proposed_cnt FROM workshop_agg), 0),
    'contracted', COALESCE((SELECT contracted_cnt FROM workshop_agg), 0),
    'active', COALESCE((SELECT active_cnt FROM workshop_agg), 0),
    'completed', COALESCE((SELECT completed_cnt FROM workshop_agg), 0),
    'followup', COALESCE((SELECT followup_cnt FROM workshop_agg), 0)
  ),
  'product_requests', jsonb_build_object(
    'bugs_pending', COALESCE((SELECT bugs_pending FROM cpo_agg), 0),
    'bugs_approved', COALESCE((SELECT bugs_approved FROM cpo_agg), 0),
    'features_pending', COALESCE((SELECT features_pending FROM cpo_agg), 0)
  )
) AS state;
-- ---- Section 3: Product (Pine, via synced snapshots) --------------------
-- Pine は別DBだが、cron-dashboard-sync が dashboard_kpi_snapshots に同期済み
CREATE OR REPLACE VIEW v_product_state AS
WITH latest_kpi AS (
  SELECT *
  FROM dashboard_kpi_snapshots
  ORDER BY snapshot_date DESC
  LIMIT 1
),
recent_bugs AS (
  SELECT COUNT(*) AS cnt
  FROM cpo_requests
  WHERE category = 'bug' AND status = 'pending'
    AND created_at > NOW() - INTERVAL '30 days'
)
SELECT jsonb_build_object(
  'customer_count', COALESCE((SELECT customer_count FROM latest_kpi), 0),
  'booking_count', COALESCE((SELECT booking_count FROM latest_kpi), 0),
  'mrr', COALESCE((SELECT mrr FROM latest_kpi), 0),
  'errors_unresolved', COALESCE((SELECT cnt FROM recent_bugs), 0),
  'last_sync_at', (SELECT snapshot_date FROM latest_kpi)
) AS state;
-- ---- Section 4: Ops ------------------------------------------------------
CREATE OR REPLACE VIEW v_ops_state AS
WITH tasks_agg AS (
  SELECT
    COUNT(*) FILTER (WHERE status IN ('open','in_progress')) AS open_cnt,
    COUNT(*) FILTER (WHERE status IN ('open','in_progress')
                     AND due_date < CURRENT_DATE) AS overdue_cnt,
    COUNT(*) FILTER (WHERE status = 'delegated') AS delegated_cnt,
    COUNT(*) FILTER (WHERE status = 'done'
                     AND updated_at >= CURRENT_DATE - INTERVAL '7 days') AS done_7d
  FROM tasks
),
today_tasks AS (
  SELECT COUNT(*) AS cnt FROM tasks
  WHERE due_date = CURRENT_DATE AND status IN ('open','in_progress')
),
agent_activity_today AS (
  SELECT
    SUM(invocation_count) AS invocations,
    SUM(success_count) AS successes,
    SUM(error_count) AS errors,
    SUM(approval_count) AS approvals,
    SUM(rejection_count) AS rejections
  FROM dashboard_agent_metrics
  WHERE snapshot_date = CURRENT_DATE
),
recent_decisions AS (
  SELECT COUNT(*) AS cnt
  FROM decisions
  WHERE decided_at >= CURRENT_DATE - INTERVAL '7 days'
    AND status = 'active'
)
SELECT jsonb_build_object(
  'tasks', jsonb_build_object(
    'open', COALESCE((SELECT open_cnt FROM tasks_agg), 0),
    'overdue', COALESCE((SELECT overdue_cnt FROM tasks_agg), 0),
    'delegated', COALESCE((SELECT delegated_cnt FROM tasks_agg), 0),
    'done_last_7d', COALESCE((SELECT done_7d FROM tasks_agg), 0),
    'due_today', COALESCE((SELECT cnt FROM today_tasks), 0)
  ),
  'agent_activity_today', jsonb_build_object(
    'invocations', COALESCE((SELECT invocations FROM agent_activity_today), 0),
    'successes', COALESCE((SELECT successes FROM agent_activity_today), 0),
    'errors', COALESCE((SELECT errors FROM agent_activity_today), 0),
    'approvals', COALESCE((SELECT approvals FROM agent_activity_today), 0),
    'rejections', COALESCE((SELECT rejections FROM agent_activity_today), 0)
  ),
  'decisions_last_7d', COALESCE((SELECT cnt FROM recent_decisions), 0)
) AS state;
-- ---- Section 5: Strategic ------------------------------------------------
CREATE OR REPLACE VIEW v_strategic_state AS
WITH current_period AS (
  SELECT
    CASE
      WHEN EXTRACT(MONTH FROM CURRENT_DATE) BETWEEN 1 AND 3 THEN
        EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-Q1'
      WHEN EXTRACT(MONTH FROM CURRENT_DATE) BETWEEN 4 AND 6 THEN
        EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-Q2'
      WHEN EXTRACT(MONTH FROM CURRENT_DATE) BETWEEN 7 AND 9 THEN
        EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-Q3'
      ELSE EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-Q4'
    END AS period
),
okr_agg AS (
  SELECT
    COUNT(kr.id) AS total_krs,
    COUNT(kr.id) FILTER (WHERE kr.on_track = true) AS on_track_cnt,
    COUNT(kr.id) FILTER (WHERE kr.on_track = false) AS off_track_cnt,
    AVG(
      CASE WHEN kr.target_value > 0
           THEN LEAST(kr.current_value / kr.target_value, 1.0)
           ELSE NULL
      END
    ) AS avg_progress
  FROM key_results kr
  JOIN okrs o ON o.id = kr.okr_id
  WHERE o.closed_at IS NULL
    AND o.period = (SELECT period FROM current_period)
),
recent_decisions AS (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', id,
      'title', title,
      'date', decided_at,
      'tags', tags
    ) ORDER BY decided_at DESC
  ) AS decisions
  FROM (
    SELECT id, title, decided_at, tags
    FROM decisions
    WHERE status = 'active'
    ORDER BY decided_at DESC
    LIMIT 5
  ) sub
),
expiring_contracts AS (
  SELECT jsonb_agg(
    jsonb_build_object(
      'counterparty', counterparty_name,
      'type', type,
      'expires_at', expires_at,
      'days_until', (expires_at - CURRENT_DATE)
    ) ORDER BY expires_at ASC
  ) AS contracts
  FROM (
    SELECT counterparty_name, type, expires_at
    FROM contracts
    WHERE status = 'active'
      AND expires_at IS NOT NULL
      AND expires_at <= CURRENT_DATE + INTERVAL '30 days'
    ORDER BY expires_at ASC
    LIMIT 5
  ) sub
)
SELECT jsonb_build_object(
  'current_quarter', (SELECT period FROM current_period),
  'okr', jsonb_build_object(
    'total_krs', COALESCE((SELECT total_krs FROM okr_agg), 0),
    'on_track', COALESCE((SELECT on_track_cnt FROM okr_agg), 0),
    'off_track', COALESCE((SELECT off_track_cnt FROM okr_agg), 0),
    'avg_progress_pct', ROUND(
      COALESCE((SELECT avg_progress * 100 FROM okr_agg), 0)::numeric,
      1
    )
  ),
  'recent_decisions', COALESCE((SELECT decisions FROM recent_decisions), '[]'::jsonb),
  'contracts_expiring_soon', COALESCE((SELECT contracts FROM expiring_contracts), '[]'::jsonb)
) AS state;
-- ---- RPC: get_company_state ----------------------------------------------
CREATE OR REPLACE FUNCTION get_company_state(
  p_sections TEXT[] DEFAULT ARRAY['financial','pipeline','product','ops','strategic']
) RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb := '{}'::jsonb;
  s TEXT;
  section_state jsonb;
BEGIN
  FOREACH s IN ARRAY p_sections LOOP
    CASE s
      WHEN 'financial' THEN
        SELECT state INTO section_state FROM v_financial_state;
      WHEN 'pipeline' THEN
        SELECT state INTO section_state FROM v_pipeline_state;
      WHEN 'product' THEN
        SELECT state INTO section_state FROM v_product_state;
      WHEN 'ops' THEN
        SELECT state INTO section_state FROM v_ops_state;
      WHEN 'strategic' THEN
        SELECT state INTO section_state FROM v_strategic_state;
      ELSE
        CONTINUE;
    END CASE;
    result := result || jsonb_build_object(s, section_state);
  END LOOP;

  result := result || jsonb_build_object(
    'computed_at', NOW(),
    'sections', to_jsonb(p_sections)
  );
  RETURN result;
END;
$$;
-- service_role 用に実行権限付与（明示的に）
GRANT EXECUTE ON FUNCTION get_company_state(TEXT[]) TO service_role;
GRANT SELECT ON v_financial_state, v_pipeline_state, v_product_state, v_ops_state, v_strategic_state TO service_role;
-- ---- 軽量サマリー関数（#cos 投稿用 1文） --------------------------------
CREATE OR REPLACE FUNCTION get_company_summary() RETURNS TEXT
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
DECLARE
  fin jsonb;
  ops jsonb;
  strat jsonb;
BEGIN
  SELECT state INTO fin FROM v_financial_state;
  SELECT state INTO ops FROM v_ops_state;
  SELECT state INTO strat FROM v_strategic_state;

  RETURN format(
    '残高 ¥%s / 未入金 %s件 / 承認待ちタスク %s件 / 進捗 %s%%',
    to_char((fin->>'cash_balance')::numeric, 'FM999,999,999'),
    (fin->'unpaid_invoices'->>'count'),
    (ops->'tasks'->>'delegated'),
    (strat->'okr'->>'avg_progress_pct')
  );
END;
$$;
GRANT EXECUTE ON FUNCTION get_company_summary() TO service_role;
