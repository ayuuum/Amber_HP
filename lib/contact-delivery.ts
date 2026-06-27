import { captureError } from '@/lib/capture-error'
import { contactInquiryLabels, type ContactInquiryType } from '@/lib/contact'

export type ContactPayload = {
  name: string
  company: string
  email: string
  phone: string
  inquiryType: ContactInquiryType
  message: string
  sourcePage: string
  referrerPath: string
  source: 'hp_form'
}

type DeliveryResult = {
  ok: boolean
  channel: string
  error?: string
}

type ContactDeliverySummary = {
  persisted: DeliveryResult
  notifications: DeliveryResult[]
  dryRun: boolean
}

export async function deliverContact(payload: ContactPayload): Promise<ContactDeliverySummary> {
  const persisted = await persistContact(payload)
  const notifications = await notifyContact(payload)
  const dryRun = isDevelopment() && persisted.channel === 'dry-run'

  return {
    persisted,
    notifications,
    dryRun,
  }
}

async function persistContact(payload: ContactPayload): Promise<DeliveryResult> {
  const notionToken = process.env.NOTION_TOKEN
  const notionDatabaseId = process.env.NOTION_CONTACT_DATABASE_ID

  if (notionToken && notionDatabaseId) {
    return persistToNotion(payload, notionToken, notionDatabaseId)
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (supabaseUrl && supabaseServiceRoleKey) {
    return persistToSupabase(
      payload,
      supabaseUrl,
      supabaseServiceRoleKey,
      process.env.SUPABASE_CONTACT_TABLE ?? 'contact_submissions',
    )
  }

  if (isDevelopment()) {
    console.info('Contact form dry-run persistence:', {
      inquiryType: payload.inquiryType,
      sourcePage: payload.sourcePage,
      emailDomain: payload.email.split('@')[1] ?? '',
    })
    return { ok: true, channel: 'dry-run' }
  }

  captureError('Contact form: no persistence method configured')
  return { ok: false, channel: 'none', error: 'no_persistence_configured' }
}

async function notifyContact(payload: ContactPayload): Promise<DeliveryResult[]> {
  const results: DeliveryResult[] = []

  const csoUrl = process.env.CSO_AGENT_URL
  const csoSecret = process.env.CSO_AGENT_SECRET
  const csoAnonKey = process.env.CSO_AGENT_ANON_KEY

  if (csoUrl && csoSecret && csoAnonKey) {
    results.push(await notifyCsoAgent(payload, csoUrl, csoSecret, csoAnonKey))
  }

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    results.push(await notifyResend(payload, resendKey))
  }

  if (results.length === 0 && isDevelopment()) {
    console.info('Contact form dry-run notification:', {
      inquiryType: payload.inquiryType,
      sourcePage: payload.sourcePage,
    })
    results.push({ ok: true, channel: 'dry-run' })
  }

  if (results.length === 0) {
    captureError('Contact form: no notification method configured')
    results.push({ ok: false, channel: 'none', error: 'no_notification_configured' })
  }

  return results
}

async function persistToNotion(
  payload: ContactPayload,
  token: string,
  databaseId: string,
): Promise<DeliveryResult> {
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Name: titleProperty(payload.name),
        Email: emailProperty(payload.email),
        Company: richTextProperty(payload.company || '-'),
        Phone: richTextProperty(payload.phone || '-'),
        Type: selectProperty(contactInquiryLabels[payload.inquiryType]),
        Source: richTextProperty(payload.sourcePage || payload.source),
        Referrer: richTextProperty(payload.referrerPath || '-'),
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: { content: payload.message },
              },
            ],
          },
        },
      ],
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    captureError('Notion contact persistence error', { status: response.status, body: text })
    return { ok: false, channel: 'notion', error: `status_${response.status}` }
  }

  return { ok: true, channel: 'notion' }
}

async function persistToSupabase(
  payload: ContactPayload,
  supabaseUrl: string,
  serviceRoleKey: string,
  table: string,
): Promise<DeliveryResult> {
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(table)}`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify({
      name: payload.name,
      company: payload.company || null,
      email: payload.email,
      phone: payload.phone || null,
      inquiry_type: payload.inquiryType,
      inquiry_label: contactInquiryLabels[payload.inquiryType],
      message: payload.message,
      source_page: payload.sourcePage || null,
      referrer_path: payload.referrerPath || null,
      source: payload.source,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    captureError('Supabase contact persistence error', { status: response.status, body: text })
    return { ok: false, channel: 'supabase', error: `status_${response.status}` }
  }

  return { ok: true, channel: 'supabase' }
}

async function notifyCsoAgent(
  payload: ContactPayload,
  csoUrl: string,
  csoSecret: string,
  csoAnonKey: string,
): Promise<DeliveryResult> {
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

  if (!response.ok) {
    const text = await response.text()
    captureError('CSO Agent error', { status: response.status, body: text })
    return { ok: false, channel: 'cso-agent', error: `status_${response.status}` }
  }

  return { ok: true, channel: 'cso-agent' }
}

async function notifyResend(payload: ContactPayload, resendKey: string): Promise<DeliveryResult> {
  const to = process.env.CONTACT_EMAIL ?? 'ayumu.matsui@amber-inc.com'
  const from = process.env.CONTACT_FROM ?? 'noreply@amber-inc.com'
  const inquiryLabel = contactInquiryLabels[payload.inquiryType]

  const html = `
<h2>Amber HPよりお問い合わせがありました</h2>
<table border="0" cellpadding="6" style="font-family:sans-serif;font-size:14px">
  <tr><td><strong>お名前</strong></td><td>${escapeHtml(payload.name)}</td></tr>
  <tr><td><strong>会社名</strong></td><td>${escapeHtml(payload.company) || '-'}</td></tr>
  <tr><td><strong>メール</strong></td><td>${escapeHtml(payload.email)}</td></tr>
  <tr><td><strong>電話番号</strong></td><td>${escapeHtml(payload.phone) || '-'}</td></tr>
  <tr><td><strong>種別</strong></td><td>${escapeHtml(inquiryLabel)}</td></tr>
  <tr><td><strong>流入元</strong></td><td>${escapeHtml(payload.sourcePage) || '-'}</td></tr>
  <tr><td><strong>参照元</strong></td><td>${escapeHtml(payload.referrerPath) || '-'}</td></tr>
</table>
<h3>メッセージ</h3>
<p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px">${escapeHtml(payload.message)}</p>
`

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `【Amber HP お問い合わせ】${inquiryLabel} - ${payload.name}`,
      html,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    captureError('Resend error', { status: response.status, body: text })
    return { ok: false, channel: 'resend', error: `status_${response.status}` }
  }

  return { ok: true, channel: 'resend' }
}

function titleProperty(content: string) {
  return {
    title: [{ text: { content } }],
  }
}

function richTextProperty(content: string) {
  return {
    rich_text: [{ text: { content } }],
  }
}

function emailProperty(email: string) {
  return {
    email,
  }
}

function selectProperty(name: string) {
  return {
    select: { name },
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isDevelopment() {
  return process.env.NODE_ENV !== 'production'
}
