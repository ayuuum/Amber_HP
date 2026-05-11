import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

/**
 * Forwards contact form submissions to the Amber CSO Agent
 * (Supabase Edge Function: cso-agent).
 *
 * The CSO Agent persists the lead to Supabase, generates an AI reply draft,
 * researches the company, and posts a Slack notification with action buttons.
 * Required env vars (Vercel → Production):
 *   - CSO_AGENT_URL        : https://<project>.supabase.co/functions/v1/cso-agent
 *   - CSO_AGENT_SECRET     : x-amber-secret value (matches AMBER_WEBHOOK_SECRET on Supabase)
 *   - CSO_AGENT_ANON_KEY   : Supabase anon key (required by Edge Function gateway)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const url = process.env.CSO_AGENT_URL
    const secret = process.env.CSO_AGENT_SECRET
    const anonKey = process.env.CSO_AGENT_ANON_KEY

    if (!url || !secret || !anonKey) {
      console.error(
        'Contact form: CSO_AGENT_URL / CSO_AGENT_SECRET / CSO_AGENT_ANON_KEY missing'
      )
      return NextResponse.json(
        { success: false, error: '送信に失敗しました' },
        { status: 500 }
      )
    }

    const payload = {
      name: body.name ?? '',
      company: body.company ?? '',
      email: body.email ?? '',
      phone: body.phone ?? '',
      inquiryType: body.inquiryType ?? 'general',
      message: body.message ?? '',
      source: 'hp_form',
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-amber-secret': secret,
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('CSO Agent error:', response.status, text)
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
