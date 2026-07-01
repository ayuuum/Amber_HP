import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface MetricOptions {
  errorType?: string;    // e.g. "APIError", "TimeoutError", "ValidationError"
  errorMessage?: string; // short description
  latencyMs?: number;    // total execution time
}

/**
 * Record agent invocation metric.
 * Call this before returning from each agent function.
 *
 * Enhanced: now tracks error_type, error_message, latency_ms.
 * Backward compatible — old calls without options still work.
 */
export async function recordMetric(
  agentName: string,
  success: boolean,
  opts: MetricOptions = {}
): Promise<void> {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const today = new Date().toISOString().split("T")[0];
    const col = success ? "success_count" : "error_count";

    // Try to increment existing row
    const { data: existing } = await supabase
      .from("dashboard_agent_metrics")
      .select("id, invocation_count, success_count, error_count, total_latency_ms, last_error_type, last_error_message")
      .eq("snapshot_date", today)
      .eq("agent_name", agentName)
      .single();

    const latencyUpdate = opts.latencyMs
      ? { total_latency_ms: (existing?.total_latency_ms || 0) + opts.latencyMs }
      : {};

    const errorUpdate = !success && opts.errorType
      ? { last_error_type: opts.errorType, last_error_message: (opts.errorMessage || "").slice(0, 500) }
      : {};

    if (existing) {
      await supabase
        .from("dashboard_agent_metrics")
        .update({
          invocation_count: (existing.invocation_count || 0) + 1,
          [col]: (existing[col] || 0) + 1,
          ...latencyUpdate,
          ...errorUpdate,
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("dashboard_agent_metrics").insert({
        snapshot_date: today,
        agent_name: agentName,
        invocation_count: 1,
        success_count: success ? 1 : 0,
        error_count: success ? 0 : 1,
        total_latency_ms: opts.latencyMs || 0,
        ...((!success && opts.errorType) ? {
          last_error_type: opts.errorType,
          last_error_message: (opts.errorMessage || "").slice(0, 500),
        } : {}),
      });
    }
  } catch (e) {
    // Metrics should never break the agent
    console.error(`metrics recording failed for ${agentName}:`, e);
  }
}

/**
 * Helper to measure execution time and record metric in one call.
 * Usage:
 *   const result = await withMetrics("cpo-agent", async () => { ... });
 */
export async function withMetrics<T>(
  agentName: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    await recordMetric(agentName, true, { latencyMs: Math.round(performance.now() - start) });
    return result;
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    const errorType = err.message.includes("Timeout") ? "TimeoutError"
      : err.message.includes("fetch") ? "NetworkError"
      : "UnknownError";
    await recordMetric(agentName, false, {
      latencyMs: Math.round(performance.now() - start),
      errorType,
      errorMessage: err.message,
    });
    throw e;
  }
}
