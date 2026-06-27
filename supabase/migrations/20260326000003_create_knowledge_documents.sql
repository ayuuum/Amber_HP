-- ナレッジベース: Agent/Claude Codeが生成したドキュメントを一元管理
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- メタデータ
  title text NOT NULL,
  doc_type text NOT NULL,  -- strategy, proposal, research, playbook, retro, seo, other
  tags text[] DEFAULT '{}',
  summary text,            -- 1-2行の要約（一覧表示用）

  -- 本文
  content_md text NOT NULL, -- Markdown本文

  -- 出典
  source_agent text,       -- 生成元Agent名 (cso-agent, scout-agent, claude-code等)
  source_path text,        -- GitHub/ローカルパス (amber/docs/sales/xxx.md等)
  source_url text,         -- 外部URL（あれば）

  -- 関連
  related_company text,    -- 関連企業名（HITOWA等）
  related_project text,    -- 関連プロジェクト（Pine, Amber Dashboard等）

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_knowledge_docs_type ON knowledge_documents(doc_type);
CREATE INDEX idx_knowledge_docs_created ON knowledge_documents(created_at DESC);
CREATE INDEX idx_knowledge_docs_search ON knowledge_documents USING gin(to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(content_md, '')));
-- RLS
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read" ON knowledge_documents FOR SELECT USING (true);
CREATE POLICY "Allow service write" ON knowledge_documents FOR ALL USING (true) WITH CHECK (true);
-- updated_at trigger
CREATE TRIGGER knowledge_documents_updated_at
  BEFORE UPDATE ON knowledge_documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
