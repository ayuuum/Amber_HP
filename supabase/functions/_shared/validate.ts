/**
 * Shared input validation middleware for Amber Edge Functions.
 *
 * Usage:
 *   const result = await validateRequest(req, { requiredFields: ["company_name"] });
 *   if (result instanceof Response) return result;
 *   const { company_name } = result;
 *
 *   const slackResult = await validateSlackRequest(req);
 *   if (slackResult instanceof Response) return slackResult;
 *   const { bodyText } = slackResult;
 */

import { corsHeaders } from "./cors.ts";
import { verifyAmberSecret } from "./auth.ts";

export interface ValidateOptions {
  maxBodySize?: number;       // default: 1MB (1_048_576)
  requireAuth?: boolean;      // default: true — check x-amber-secret
  requiredFields?: string[];  // field names that must be non-empty strings
  contentType?: string;       // default: "application/json"
}

/**
 * Validate an incoming request and return parsed JSON body or an error Response.
 * Handles OPTIONS preflight automatically.
 */
export async function validateRequest<T = Record<string, unknown>>(
  req: Request,
  opts: ValidateOptions = {}
): Promise<T | Response> {
  const {
    maxBodySize = 1_048_576,
    requireAuth = true,
    requiredFields = [],
    contentType = "application/json",
  } = opts;

  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Method check
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Auth check — accept AMBER_CRON_SECRET / AMBER_SECRET / AMBER_WEBHOOK_SECRET.
  if (requireAuth && !verifyAmberSecret(req)) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Content-Type check
  const ct = req.headers.get("content-type") || "";
  if (contentType && !ct.includes(contentType)) {
    return new Response(
      JSON.stringify({ error: `Expected Content-Type: ${contentType}` }),
      { status: 415, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Body size check via Content-Length (before reading body)
  const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
  if (contentLength > maxBodySize) {
    return new Response(
      JSON.stringify({ error: `Body too large: ${contentLength} bytes (max ${maxBodySize})` }),
      { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Parse body
  let body: T;
  try {
    const text = await req.text();
    if (text.length > maxBodySize) {
      return new Response(
        JSON.stringify({ error: `Body too large: ${text.length} bytes (max ${maxBodySize})` }),
        { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    body = JSON.parse(text) as T;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Required fields check
  for (const field of requiredFields) {
    const value = (body as Record<string, unknown>)[field];
    if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
      return new Response(
        JSON.stringify({ error: `Missing required field: ${field}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  return body;
}

// -- Slack-specific validation --

interface SlackValidationResult {
  bodyText: string;
}

/**
 * Validate a Slack request: HMAC-SHA256 signature + timestamp freshness.
 * Returns the raw body text on success, or an error Response.
 */
export async function validateSlackRequest(
  req: Request
): Promise<SlackValidationResult | Response> {
  const bodyText = await req.text();
  const timestamp = req.headers.get("x-slack-request-timestamp") || "";
  const signature = req.headers.get("x-slack-signature") || "";

  // Timestamp freshness (reject if older than 5 minutes)
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts) || Math.abs(Math.floor(Date.now() / 1000) - ts) > 300) {
    return new Response("Request too old", { status: 401 });
  }

  // HMAC-SHA256 verification
  const secret = Deno.env.get("SLACK_SIGNING_SECRET");
  if (!secret) {
    console.error("SLACK_SIGNING_SECRET not set");
    return new Response("Server misconfigured", { status: 500 });
  }

  const base = `v0:${timestamp}:${bodyText}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(base));
  const hex = "v0=" + Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (hex !== signature) {
    return new Response("Invalid signature", { status: 401 });
  }

  return { bodyText };
}

// -- LLM input sanitization --

/**
 * Sanitize user input before sending to an LLM.
 * Truncates to maxLength and strips control characters (keeps newlines).
 */
export function sanitizeForLLM(text: string, maxLength = 3000): string {
  // Strip control characters except newline (\n) and tab (\t)
  // deno-lint-ignore no-control-regex
  const cleaned = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return cleaned.slice(0, maxLength);
}
