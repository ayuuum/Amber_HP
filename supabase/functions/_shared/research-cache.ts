import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface CachedResearch {
  id: string;
  company_name: string;
  research_data: Record<string, unknown>;
  created_at: string;
}

/**
 * Get cached company research if it exists and is recent (within maxAgeDays).
 */
export async function getCachedResearch(
  companyName: string,
  maxAgeDays = 7
): Promise<CachedResearch | null> {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - maxAgeDays);

    const { data } = await supabase
      .from("company_research_cache")
      .select("id, company_name, research_data, created_at")
      .ilike("company_name", `%${companyName}%`)
      .gte("created_at", cutoff.toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    return data ?? null;
  } catch {
    return null;
  }
}

/**
 * Save company research to cache.
 */
export async function cacheResearch(
  companyName: string,
  researchData: Record<string, unknown>
): Promise<void> {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("company_research_cache").upsert(
      {
        company_name: companyName,
        research_data: researchData,
        created_at: new Date().toISOString(),
      },
      { onConflict: "company_name" }
    );
  } catch (e) {
    console.error("cacheResearch failed:", e);
  }
}
