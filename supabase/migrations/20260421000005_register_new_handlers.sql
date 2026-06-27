-- ==========================================================================
-- Register new intent handlers introduced in 60→90% autonomy push
-- 2026-04-21
-- ==========================================================================

-- alert-human-handler を alert_human の正式 handler として登録
INSERT INTO agent_capabilities (agent_name, intents_handled, invoke_url, priority, notes)
VALUES (
  'alert-human-handler',
  ARRAY['alert_human'],
  '/alert-human-handler',
  10,   -- 高優先: 他に alert_human ハンドラがあっても先に呼ぶ
  'Ayumu への structured alert を #cos に投稿。Company Context を付加、推奨アクションを生成'
)
ON CONFLICT (agent_name) DO UPDATE
  SET intents_handled = EXCLUDED.intents_handled,
      invoke_url = EXCLUDED.invoke_url,
      priority = EXCLUDED.priority,
      notes = EXCLUDED.notes,
      updated_at = NOW();
-- Trust threshold: 社内Slack投稿のみなので常時auto OK
INSERT INTO agent_trust_thresholds (agent_name, action_type, min_score, notes) VALUES
  ('alert-human-handler', 'auto_send', 0, '社内Slackのみ')
ON CONFLICT (agent_name, action_type) DO UPDATE
  SET min_score = EXCLUDED.min_score, notes = EXCLUDED.notes, updated_at = NOW();
-- weekly-sdr-agent / scout-agent が intent-aware になったので notes を更新
UPDATE agent_capabilities
  SET notes = '営業リサーチ+アプローチ文。accelerate_sales intent で BATCH_SIZE を 5→15 に拡張。runway<3ヶ月でも自動拡張',
      updated_at = NOW()
  WHERE agent_name = 'weekly-sdr-agent';
UPDATE agent_capabilities
  SET notes = '業界/企業リサーチ+スコアリング。research_company intent でmode=full 強制、urgency high/critical でも full',
      updated_at = NOW()
  WHERE agent_name = 'scout-agent';
