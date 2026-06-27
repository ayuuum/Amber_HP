ALTER TABLE outreach_targets ADD COLUMN IF NOT EXISTS agentmail_message_id TEXT;
ALTER TABLE outreach_targets ADD COLUMN IF NOT EXISTS agentmail_thread_id TEXT;
ALTER TABLE outreach_targets ADD COLUMN IF NOT EXISTS agentmail_reply_message_id TEXT;
ALTER TABLE outreach_targets ADD COLUMN IF NOT EXISTS reply_preview TEXT;
