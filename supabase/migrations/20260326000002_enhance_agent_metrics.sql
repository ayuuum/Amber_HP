-- dashboard_agent_metrics にエラー詳細 + レイテンシ追跡カラムを追加
ALTER TABLE dashboard_agent_metrics
  ADD COLUMN IF NOT EXISTS total_latency_ms integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_error_type text,
  ADD COLUMN IF NOT EXISTS last_error_message text;
COMMENT ON COLUMN dashboard_agent_metrics.total_latency_ms IS '1日の合計実行時間(ms)。invocation_countで割ると平均レイテンシ';
COMMENT ON COLUMN dashboard_agent_metrics.last_error_type IS '最後のエラー種別 (TimeoutError, APIError, ValidationError等)';
COMMENT ON COLUMN dashboard_agent_metrics.last_error_message IS '最後のエラーメッセージ(500文字以内)';
