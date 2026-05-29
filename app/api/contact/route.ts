import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

/**
 * Forwards contact form submissions to the Amber CSO Agent (Supabase Edge Function),
 * or falls back to sending a notification email via Resend when the agent is unavailable.
 *
 * Required env vars for CSO Agent (optional):
 *   - CSO_AGENT_URL        : https://<project>.supabase.co/functions/v1/cso-agent
 *   - CSO_AGENT_SECRET     : x-amber-secret value
 *   - CSO_AGENT_ANON_KEY   : Supabase anon key
 *
 * Required env vars for email fallback:
 *   - RESEND_API_KEY       : Resend API key (https://resend.com)
 *   - CONTACT_EMAIL        : Destination address (defaults to ayumu.matsui@amber-inc.com)
 *   - CONTACT_FROM         : Sender address (defaults to noreply@amber-inc.com)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const payload = {
      name: body.name ?? '',
      company: body.company ?? '',
      email: body.email ?? '',
      phone: body.phone ?? '',
      inquiryType: body.inquiryType ?? 'general',
      message: body.message ?? '',
      source: 'hp_form',
    }

    const csoUrl = process.env.CSO_AGENT_URL
    const csoSecret = process.env.CSO_AGENT_SECRET
    const csoAnonKey = process.env.CSO_AGENT_ANON_KEY

    if (csoUrl && csoSecret && csoAnonKey) {
      const response = await fetch(csoUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-amber-secret': csoSecret,
          apikey: csoAnonKey,
          Authorization: `Bearer ${csoAnonKey}`,
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        return NextResponse.json({ success: true })
      }

      const text = await response.text()
      console.error('CSO Agent error:', response.status, text)
    }

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      console.error('Contact form: no delivery method configured (CSO Agent or RESEND_API_KEY)')
      return NextResponse.json(
        { success: false, error: '送信に失敗しました' },
        { status: 500 }
      )
    }

    const to = process.env.CONTACT_EMAIL ?? 'ayumu.matsui@amber-inc.com'
    const from = process.env.CONTACT_FROM ?? 'noreply@amber-inc.com'

    const inquiryLabels: Record<string, string> = {
      service: 'サービス導入・お見積り',
      partnership: '業務提携・投資・出資',
      recruiting: '採用・参画',
      demo: 'デモ・資料請求',
      general: 'その他・一般的なお問い合わせ',
    }
    const inquiryLabel = inquiryLabels[payload.inquiryType] ?? payload.inquiryType

    const html = `
<h2>Amber HPよりお問い合わせがありました</h2>
<table border="0" cellpadding="6" style="font-family:sans-serif;font-size:14px">
  <tr><td><strong>お名前</strong></td><td>${escapeHtml(payload.name)}</td></tr>
  <tr><td><strong>会社名</strong></td><td>${escapeHtml(payload.company) || '—'}</td></tr>
  <tr><td><strong>メール</strong></td><td>${escapeHtml(payload.email)}</td></tr>
  <tr><td><strong>電話番号</strong></td><td>${escapeHtml(payload.phone) || '—'}</td></tr>
  <tr><td><strong>種別</strong></td><td>${escapeHtml(inquiryLabel)}</td></tr>
</table>
<h3>メッセージ</h3>
<p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px">${escapeHtml(payload.message)}</p>
`

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: payload.email,
        subject: `【Amber HP お問い合わせ】${inquiryLabel} — ${payload.name}`,
        html,
      }),
    })

    if (!emailRes.ok) {
      const text = await emailRes.text()
      console.error('Resend error:', emailRes.status, text)
      return NextResponse.json(
        { success: false, error: '送信に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: '送信に失敗しました' },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
