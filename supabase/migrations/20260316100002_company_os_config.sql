-- ============================================================
-- Company OS: pg_net用のapp.settings設定
-- Supabase Dashboard > SQL Editor で実行
-- ============================================================
-- NOTE: これらの値はSupabase DashboardのDatabase Settings > App Settingsで設定するか、
-- 以下のSQLで直接設定する。実際の値はDashboardで確認してください。

-- 本番環境の設定例（Supabase Dashboard > SQL Editor で実行）:
-- ALTER DATABASE postgres SET app.settings.supabase_url = 'https://ymwbolivoumrvubjxpoy.supabase.co';
-- ALTER DATABASE postgres SET app.settings.service_role_key = '<your-service-role-key>';

-- ============================================================
-- 動作確認用ビュー: 最新の状態遷移を確認
-- ============================================================
CREATE OR REPLACE VIEW public.v_recent_transitions AS
SELECT
  st.id,
  st.entity_type,
  st.entity_id,
  st.from_status,
  st.to_status,
  st.triggered_by,
  st.reason,
  st.routed_to,
  st.routing_errors,
  st.created_at,
  CASE
    WHEN st.entity_type = 'companies' THEN c.name
    WHEN st.entity_type = 'leads' THEN l.name
    WHEN st.entity_type = 'outreach_targets' THEN ot.company_name
    WHEN st.entity_type = 'cpo_requests' THEN cr.spec_title
    ELSE NULL
  END AS entity_name
FROM public.state_transitions st
LEFT JOIN public.companies c ON st.entity_type = 'companies' AND st.entity_id = c.id
LEFT JOIN public.leads l ON st.entity_type = 'leads' AND st.entity_id = l.id
LEFT JOIN public.outreach_targets ot ON st.entity_type = 'outreach_targets' AND st.entity_id = ot.id
LEFT JOIN public.cpo_requests cr ON st.entity_type = 'cpo_requests' AND st.entity_id = cr.id
ORDER BY st.created_at DESC
LIMIT 100;
-- ============================================================
-- Company状態サマリービュー（ダッシュボード用）
-- ============================================================
CREATE OR REPLACE VIEW public.v_company_status_summary AS
SELECT
  status,
  business,
  count(*) AS count,
  coalesce(sum(mrr), 0) AS total_mrr
FROM public.companies
GROUP BY status, business
ORDER BY status, business;
