import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { withMetrics } from "../_shared/metrics.ts";
import { fetchWithRetry } from "../_shared/retry.ts";
import { PROGRAM_MD } from "./program.ts";
import { saveToKnowledge } from "../_shared/knowledge.ts";
import { lookupKnowledge, formatKnowledgeContext } from "../_shared/knowledge-lookup.ts";
import { getCachedResearch, cacheResearch } from "../_shared/research-cache.ts";
import { recordPipelineEvent } from "../_shared/pipeline.ts";
import { validateRequest, sanitizeForLLM } from "../_shared/validate.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  source?: string;
}

// 事業分類
function classifyBusiness(inquiryType: string, message: string): string {
  const msg = message.toLowerCase();
  if (inquiryType === "demo" || msg.includes("pine") || msg.includes("清掃") || msg.includes("ハウス") || msg.includes("予約")) {
    return "pine";
  }
  if (inquiryType === "consulting" || msg.includes("受託") || msg.includes("開発") || msg.includes("システム") || msg.includes("crm")) {
    return "ai_consulting";
  }
  return "unknown";
}

// Firecrawlで企業情報収集
async function researchCompany(company: string): Promise<Record<string, unknown> | null> {
  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey || !company) return null;

  try {
    const res = await fetchWithRetry("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `${company} 会社 事業内容 サービス`,
        limit: 3,
        scrapeOptions: { formats: ["markdown"] },
      }),
      timeoutMs: 20000,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { firecrawl: data.data?.slice(0, 2) };
  } catch {
    return null;
  }
}

// Exa.aiで企業ニュース収集
async function searchCompanyNews(company: string): Promise<Record<string, unknown> | null> {
  const apiKey = Deno.env.get("EXA_API_KEY");
  if (!apiKey || !company) return null;

  try {
    const res = await fetchWithRetry("https://api.exa.ai/search", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `${company}`,
        numResults: 3,
        useAutoprompt: true,
        type: "neural",
      }),
      timeoutMs: 15000,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { exa: data.results?.slice(0, 3) };
  } catch {
    return null;
  }
}

// Claude APIで返信文生成（program.mdをシステムプロンプトとして使用）
async function generateReply(payload: ContactPayload, research: Record<string, unknown> | null, knowledgeContext = ""): Promise<string> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return `${payload.name} 様\n\nお問い合わせいただきありがとうございます。\n担当者より24時間以内にご連絡いたします。\n\n株式会社Amber\n松井歩武`;
  }

  const inquiryTypeLabel: Record<string, string> = {
    general: "一般的なお問い合わせ",
    demo: "デモ依頼",
    consulting: "顧問相談",
    service: "サービスについて",
  };

  const researchContext = research
    ? `\n\n## 企業リサーチ結果\n${JSON.stringify(research, null, 2).substring(0, 1000)}`
    : "";

  const userPrompt = `以下のお問い合わせに対して、温かみのある返信メールを書いてください。

## お問い合わせ内容
- お名前: ${payload.name}
- 会社名: ${payload.company || "未記入"}
- メール: ${payload.email}
- 電話: ${payload.phone || "未記入"}
- 種別: ${inquiryTypeLabel[payload.inquiryType] || payload.inquiryType}
- メッセージ: ${sanitizeForLLM(payload.message)}
${researchContext}
${knowledgeContext ? `\n## 社内ナレッジ\n${knowledgeContext}` : ""}

メール本文のみ出力してください（件名不要）。`;

  const res = await fetchWithRetry("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: PROGRAM_MD,
      messages: [{ role: "user", content: userPrompt }],
    }),
    timeoutMs: 30000,
  });

  if (!res.ok) {
    console.error("Claude API error:", await res.text());
    return `${payload.name} 様\n\nお問い合わせいただきありがとうございます。\n担当者より24時間以内にご連絡いたします。\n\n株式会社Amber\n松井歩武`;
  }

  const data = await res.json();
  return data.content?.[0]?.text || "";
}

// Resendでメール送信
async function sendReplyEmail(to: string, name: string, replyText: string): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return;

  const html = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="font-family: sans-serif; color: #1a1a1a; background: #f9f9f9; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
    <div style="margin-bottom: 32px; padding-bottom: 16px; border-bottom: 2px solid #1a3a1a;">
      <p style="margin: 0; font-size: 13px; color: #666; font-weight: 600; letter-spacing: 0.1em;">AMBER</p>
    </div>
    <div style="font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${replyText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
      <p style="margin: 0;">株式会社Amber</p>
      <p style="margin: 4px 0 0;">東京都港区虎ノ門3-1-1 2階</p>
      <p style="margin: 4px 0 0;"><a href="https://amber-inc.com" style="color: #1a3a1a;">amber-inc.com</a></p>
    </div>
  </div>
</body>
</html>`;

  await fetchWithRetry("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "松井歩武 <ayumu.matsui@amber-inc.com>",
      to: [to],
      subject: `【株式会社Amber】お問い合わせありがとうございます`,
      html,
      reply_to: "ayumu.matsui@amber-inc.com",
    }),
    timeoutMs: 10000,
  });
}

// AyumuにSlack通知（ボタン付き）
async function notifyAyumu(payload: ContactPayload, leadId: string, business: string, aiReply: string): Promise<void> {
  const webhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
  if (!webhookUrl) return;

  const businessLabel = business === "pine" ? "Pine" : business === "ai_consulting" ? "AI受託" : "不明";
  const inquiryTypeLabel: Record<string, string> = {
    general: "一般",
    demo: "デモ依頼",
    consulting: "顧問相談",
    service: "サービスについて",
  };

  const buttonValue = JSON.stringify({ leadId, email: payload.email, draft: aiReply });

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      blocks: [
        {
          type: "header",
          text: { type: "plain_text", text: "📬 新規問い合わせ" },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*事業*\n${businessLabel}` },
            { type: "mrkdwn", text: `*種別*\n${inquiryTypeLabel[payload.inquiryType] || payload.inquiryType}` },
            { type: "mrkdwn", text: `*名前*\n${payload.name}` },
            { type: "mrkdwn", text: `*会社*\n${payload.company || "未記入"}` },
            { type: "mrkdwn", text: `*メール*\n${payload.email}` },
            { type: "mrkdwn", text: `*電話*\n${payload.phone || "未記入"}` },
          ],
        },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*メッセージ*\n${payload.message.substring(0, 200)}${payload.message.length > 200 ? "..." : ""}` },
        },
        { type: "divider" },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*AI返信ドラフト*\n${aiReply.substring(0, 300)}${aiReply.length > 300 ? "..." : ""}` },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: { type: "plain_text", text: "✅ このまま送信" },
              style: "primary",
              action_id: "send_reply",
              value: buttonValue,
            },
            {
              type: "button",
              text: { type: "plain_text", text: "⏭️ スキップ" },
              action_id: "skip_reply",
              value: leadId,
            },
          ],
        },
      ],
    }),
  });
}

serve(async (req) => {
  // Intent-aware: agent-router 経由で draft_response が来たら既存lead再フォロー
  const intentType = req.headers.get("x-amber-intent-type");
  const intentId = req.headers.get("x-amber-intent-id");

  let payload: ContactPayload;

  if (intentType === "draft_response") {
    // 既存 lead からペイロードを再構成
    let body: any = {};
    try {
      body = await req.clone().json();
    } catch { /* noop */ }
    const p = body.payload ?? {};
    const leadId = p.lead_id;
    if (!leadId) {
      return new Response(JSON.stringify({ error: "lead_id required for draft_response" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: lead } = await sb.from("leads").select("*").eq("id", leadId).maybeSingle();
    if (!lead) {
      return new Response(JSON.stringify({ error: "lead not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    payload = {
      name: lead.name,
      company: lead.company ?? undefined,
      email: lead.email,
      phone: lead.phone ?? undefined,
      inquiryType: lead.inquiry_type ?? "general",
      message: lead.message ?? "再フォロー",
      source: `intent:${intentId ?? "agent-router"}`,
    };
  } else {
    // 通常: HP form からの直接投稿
    const result = await validateRequest<ContactPayload>(req, {
      requiredFields: ["name", "email", "message"],
    });
    if (result instanceof Response) return result;
    payload = result;
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  return withMetrics("cso-agent", async () => {
    const business = classifyBusiness(payload.inquiryType, payload.message);

    const company = payload.company || "";

    // キャッシュ済みリサーチを確認
    const cached = await getCachedResearch(company);

    let firecrawlResult: Record<string, unknown> | null;
    let exaResult: Record<string, unknown> | null;

    if (cached) {
      firecrawlResult = (cached as unknown) as Record<string, unknown>;
      exaResult = null;
    } else {
      // 並列でリサーチ実行
      [firecrawlResult, exaResult] = await Promise.all([
        researchCompany(company),
        searchCompanyNews(company),
      ]);

      // リサーチ結果をキャッシュ
      if (firecrawlResult) {
        cacheResearch(company, firecrawlResult).catch(e => console.error("cache failed:", e));
      }
    }

    const research = (firecrawlResult || exaResult)
      ? { ...firecrawlResult, ...exaResult }
      : null;

    // ナレッジベースから関連ドキュメントを取得
    const knowledgeDocs = await lookupKnowledge(company, 3);
    const knowledgeContext = formatKnowledgeContext(knowledgeDocs);

    // 返信文生成
    const aiReply = await generateReply(payload, research, knowledgeContext);

    // leadsテーブルに保存
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        name: payload.name,
        company: payload.company || null,
        email: payload.email,
        phone: payload.phone || null,
        inquiry_type: payload.inquiryType,
        message: payload.message,
        source: payload.source || "hp_form",
        business,
        status: "new",
        company_research: research,
        ai_reply: aiReply,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to save lead:", error);
    }

    const leadId = lead?.id;
    if (leadId) {
      recordPipelineEvent({ entityType: "lead", entityId: leadId, stage: "new", agentName: "cso-agent", metadata: { company, inquiryType: payload.inquiryType } }).catch(e => console.error("pipeline event failed:", e));
    }

    // tasksテーブルにタスク挿入
    supabase.from("tasks").insert({
      title: `リード対応: ${payload.company || payload.name}`,
      description: `問い合わせ種別: ${payload.inquiryType}\nメッセージ: ${payload.message.substring(0, 500)}`,
      category: "sales",
      priority: "high",
      execution_type: "hybrid",
      delegated_to: "cso-agent",
      source: "cso",
    }).then(({ error: taskErr }) => { if (taskErr) console.error("task insert failed:", taskErr); });

    // ナレッジベースに保存
    saveToKnowledge({
      title: `返信ドラフト: ${payload.company || payload.name}（${payload.inquiryType}）`,
      doc_type: "proposal",
      tags: [payload.inquiryType, business, payload.company || ""].filter(Boolean),
      summary: `${payload.company || payload.name}からの${payload.inquiryType}問い合わせへのAI返信ドラフト`,
      content_md: `# 問い合わせ返信ドラフト\n\n## 問い合わせ元\n- 名前: ${payload.name}\n- 会社: ${payload.company || "未記入"}\n- 種別: ${payload.inquiryType}\n- メッセージ: ${payload.message}\n\n## AI返信ドラフト\n${aiReply}`,
      source_agent: "cso-agent",
      related_company: payload.company || undefined,
    }).catch(e => console.error("knowledge save failed:", e));

    // Ayumuに通知（ドラフト付きボタン）
    await notifyAyumu(payload, lead?.id || "", business, aiReply);

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  });
});
