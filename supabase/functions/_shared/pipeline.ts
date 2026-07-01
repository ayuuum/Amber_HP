import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface PipelineEventInput {
  entityType: string;
  entityId: string;
  stage: string;
  agentName: string;
  metadata?: Record<string, unknown>;
}

/**
 * Record a pipeline event for observability.
 * Fire-and-forget — errors are logged but never thrown.
 */
export async function recordPipelineEvent(
  input: PipelineEventInput
): Promise<void> {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("pipeline_events").insert({
      entity_type: input.entityType,
      entity_id: input.entityId,
      stage: input.stage,
      agent_name: input.agentName,
      metadata: input.metadata ?? {},
      created_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error(`recordPipelineEvent failed (${input.agentName}/${input.stage}):`, e);
  }
}
