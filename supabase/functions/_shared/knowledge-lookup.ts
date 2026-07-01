import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface KnowledgeResult {
  id: string;
  title: string;
  doc_type: string;
  summary: string | null;
  content_md: string;
  tags: string[];
  created_at: string;
}

/**
 * Search knowledge_documents by company name or keyword.
 * Returns matching docs ordered by recency.
 */
export async function lookupKnowledge(query: string, limit = 5): Promise<KnowledgeResult[]> {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data } = await supabase
      .from("knowledge_documents")
      .select("id, title, doc_type, summary, content_md, tags, created_at")
      .or(`title.ilike.%${query}%,related_company.ilike.%${query}%,content_md.ilike.%${query}%`)
      .order("created_at", { ascending: false })
      .limit(limit);

    return data ?? [];
  } catch (e) {
    console.error("lookupKnowledge failed:", e);
    return [];
  }
}

/**
 * Format knowledge results into a readable context string for LLM prompts.
 */
export function formatKnowledgeContext(docs: KnowledgeResult[]): string {
  if (docs.length === 0) return "（関連ドキュメントなし）";

  return docs.map(d =>
    `### ${d.title} (${d.doc_type}, ${d.created_at.split("T")[0]})\n${d.summary ?? ""}\n${d.content_md.slice(0, 500)}`
  ).join("\n\n---\n\n");
}
