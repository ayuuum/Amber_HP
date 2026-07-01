import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface KnowledgeDoc {
  title: string;
  doc_type: "strategy" | "proposal" | "research" | "playbook" | "retro" | "seo" | "other";
  tags?: string[];
  summary?: string;
  content_md: string;
  source_agent?: string;
  source_path?: string;
  source_url?: string;
  related_company?: string;
  related_project?: string;
}

/**
 * Save a document to the knowledge base.
 * Call this from any agent that generates a document worth preserving.
 *
 * Usage:
 *   await saveToKnowledge({
 *     title: "HITOWA提案書",
 *     doc_type: "proposal",
 *     tags: ["HITOWA", "おそうじ本舗", "Pine"],
 *     summary: "HITOWA HD向けPine AI予約SaaS導入提案",
 *     content_md: markdownContent,
 *     source_agent: "claude-code",
 *     related_company: "HITOWA HD",
 *     related_project: "Pine",
 *   });
 */
export async function saveToKnowledge(doc: KnowledgeDoc): Promise<string | null> {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Upsert by title + doc_type to avoid duplicates on re-runs
    const { data: existing } = await supabase
      .from("knowledge_documents")
      .select("id")
      .eq("title", doc.title)
      .eq("doc_type", doc.doc_type)
      .single();

    if (existing) {
      await supabase
        .from("knowledge_documents")
        .update({
          ...doc,
          tags: doc.tags || [],
        })
        .eq("id", existing.id);
      return existing.id;
    }

    const { data } = await supabase
      .from("knowledge_documents")
      .insert({ ...doc, tags: doc.tags || [] })
      .select("id")
      .single();

    return data?.id ?? null;
  } catch (e) {
    console.error("Failed to save knowledge document:", e);
    return null;
  }
}
