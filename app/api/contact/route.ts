import { NextRequest, NextResponse } from 'next/server'
import { captureError } from '@/lib/capture-error'
import { parseContactInquiryType } from '@/lib/contact'
import { deliverContact, type ContactPayload } from '@/lib/contact-delivery'

export const maxDuration = 60

/**
 * Persists contact form submissions first, then sends follow-up notifications.
 *
 * Persistence env vars:
 *   - NOTION_TOKEN / NOTION_CONTACT_DATABASE_ID
 *   - or SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY
 *   - SUPABASE_CONTACT_TABLE defaults to contact_submissions
 *
 * Notification env vars:
 *   - CSO_AGENT_URL        : https://<project>.supabase.co/functions/v1/cso-agent
 *   - CSO_AGENT_SECRET     : x-amber-secret value
 *   - CSO_AGENT_ANON_KEY   : Supabase anon key
 *   - RESEND_API_KEY       : Resend API key (https://resend.com)
 *   - CONTACT_EMAIL        : Destination address (defaults to ayumu.matsui@amber-inc.com)
 *   - CONTACT_FROM         : Sender address (defaults to noreply@amber-inc.com)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (typeof body.website === 'string' && body.website.trim()) {
      return NextResponse.json({ success: true })
    }

    const inquiryType = parseContactInquiryType(body.inquiryType) ?? 'general'
    const payload: ContactPayload = {
      name: normalizeText(body.name, 80),
      company: normalizeText(body.company, 120),
      email: normalizeText(body.email, 160),
      phone: normalizeText(body.phone, 40),
      inquiryType,
      message: normalizeText(body.message, 3000),
      sourcePage: normalizeText(body.sourcePage, 80),
      referrerPath: normalizeText(body.referrerPath, 300),
      source: 'hp_form',
    }

    if (!payload.name || !payload.email || !payload.message || !isValidEmail(payload.email)) {
      return NextResponse.json(
        { success: false, error: '入力内容を確認してください' },
        { status: 400 }
      )
    }

    const delivery = await deliverContact(payload)
    const hasNotification = delivery.notifications.some((result) => result.ok)

    if (!delivery.persisted.ok && !hasNotification) {
      return NextResponse.json(
        { success: false, error: '送信に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      dryRun: delivery.dryRun,
      persisted: delivery.persisted.ok,
      notified: hasNotification,
    })
  } catch (error) {
    captureError(error, { area: 'contact-form' })
    return NextResponse.json(
      { success: false, error: '送信に失敗しました' },
      { status: 500 }
    )
  }
}

function normalizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return ''
  }
  return value.trim().slice(0, maxLength)
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
