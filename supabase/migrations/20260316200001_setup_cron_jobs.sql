-- ============================================================
-- Sales AI Agents cron設定
-- Supabase pg_cron + pg_net でEdge Functionsを定期実行
-- ============================================================

-- 拡張を有効化
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
-- Vaultにシークレットを保存（Edge Function呼び出し用）
-- AMBER_SECRETはEdge Functionの認証に使うトークン
SELECT vault.create_secret(
  'AMBER_SECRET_FOR_CRON',
  'YOUR_AMBER_SECRET_HERE'
) WHERE NOT EXISTS (
  SELECT 1 FROM vault.secrets WHERE name = 'AMBER_SECRET_FOR_CRON'
);
-- ヘルパー関数: Vaultからシークレット取得してEdge Functionを呼ぶ
CREATE OR REPLACE FUNCTION invoke_edge_function(function_path TEXT, req_body JSONB DEFAULT '{}'::JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  secret_value TEXT;
  base_url TEXT := 'https://ymwbolivoumrvubjxpoy.supabase.co/functions/v1/';
BEGIN
  SELECT decrypted_secret INTO secret_value
  FROM vault.decrypted_secrets
  WHERE name = 'AMBER_SECRET_FOR_CRON'
  LIMIT 1;

  PERFORM net.http_post(
    url := base_url || function_path,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-amber-secret', COALESCE(secret_value, '')
    ),
    body := req_body
  );
END;
$$;
-- 既存のsales cronジョブをクリーンアップ（冪等性のため）
DO $$
BEGIN
  PERFORM cron.unschedule(jobname) FROM cron.job WHERE jobname LIKE 'sales_%';
EXCEPTION WHEN OTHERS THEN
  NULL;
END;
$$;
-- ─── 1. Scout Agent (Research Agent) ─────────────────────────
-- 毎日 9:00 JST (0:00 UTC) にDaily実行（業界ニュース検索）
SELECT cron.schedule(
  'sales_scout_daily',
  '0 0 * * *',
  $$ SELECT invoke_edge_function('scout-agent?mode=daily'); $$
);
-- 毎週月曜 9:00 JST にFull実行（リサーチ+スコアリング）
SELECT cron.schedule(
  'sales_scout_full',
  '0 0 * * 1',
  $$ SELECT invoke_edge_function('scout-agent?mode=full'); $$
);
-- ─── 2. Discover Targets ─────────────────────────────────────
-- 毎日 10:00 JST (1:00 UTC) に企業発見クロール
SELECT cron.schedule(
  'sales_discover_targets',
  '0 1 * * *',
  $$ SELECT invoke_edge_function('discover-targets'); $$
);
-- ─── 3. Weekly SDR Agent (Outreach Agent) ────────────────────
-- 毎日 11:00 JST (2:00 UTC) にアプローチ文生成（2社/回）
SELECT cron.schedule(
  'sales_sdr_outreach',
  '0 2 * * *',
  $$ SELECT invoke_edge_function('weekly-sdr-agent'); $$
);
-- ─── 4. Followup Cron ────────────────────────────────────────
-- 毎日 14:00 JST (5:00 UTC) にフォローアップ送信チェック
SELECT cron.schedule(
  'sales_followup',
  '0 5 * * *',
  $$ SELECT invoke_edge_function('cron-followup'); $$
);
