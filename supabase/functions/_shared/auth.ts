/**
 * Amber 共通認証ヘルパー
 *
 * GitHub Actions からの cron 起動は `x-amber-secret` ヘッダーで認証する。
 * 運用上 env var の名前が複数存在するため、どれかにマッチすればOKとする。
 *
 * 優先順:
 *   1. AMBER_CRON_SECRET (cron系の正式名)
 *   2. AMBER_SECRET (レガシー / GitHub secrets との互換)
 *   3. AMBER_WEBHOOK_SECRET (HTTP API系)
 *   4. CSO_AGENT_SECRET (HP contact form -> cso-agent)
 *
 * いずれかの env var がセットされていて、ヘッダーと一致すれば通す。
 * env var が一つもセットされていない場合は警告なしで通す（dev対応）。
 */
export function verifyAmberSecret(req: Request): boolean {
  const incoming = req.headers.get("x-amber-secret");
  const candidates = [
    Deno.env.get("AMBER_CRON_SECRET"),
    Deno.env.get("AMBER_SECRET"),
    Deno.env.get("AMBER_WEBHOOK_SECRET"),
    Deno.env.get("CSO_AGENT_SECRET"),
  ].filter((v): v is string => typeof v === "string" && v.length > 0);

  if (candidates.length === 0) return true; // dev fallback
  if (!incoming) return false;
  return candidates.includes(incoming);
}

export function unauthorizedResponse(
  corsHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
