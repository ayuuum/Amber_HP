import { NextRequest, NextResponse } from 'next/server'
import { captureError } from '@/lib/capture-error'
import { deliverContact, type ContactPayload } from '@/lib/contact-delivery'
import { getResourceBySlug } from '@/lib/resources'
import { getResourceDownloadPath } from '@/lib/resource-paths'

type Props = {
  params: { slug: string }
}

/**
 * Soft lead capture for resource downloads.
 * Always unlocks download after basic validation, even if CRM/email delivery fails.
 */
export async function POST(request: NextRequest, { params }: Props) {
  const resource = getResourceBySlug(params.slug)
  if (!resource) {
    return NextResponse.json({ success: false, error: '資料が見つかりません' }, { status: 404 })
  }

  const staticDownloadPath = `/downloads/${resource.slug}.md`
  const apiDownloadPath = getResourceDownloadPath(resource.slug)

  try {
    const body = await request.json()

    if (typeof body.website === 'string' && body.website.trim()) {
      return NextResponse.json({
        success: true,
        downloadPath: staticDownloadPath,
      })
    }

    const name = normalizeText(body.name, 80)
    const email = normalizeText(body.email, 160)
    const company = normalizeText(body.company, 120)

    if (!name || !email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'お名前とメールアドレスを正しく入力してください' },
        { status: 400 }
      )
    }

    const payload: ContactPayload = {
      name,
      company,
      email,
      phone: '',
      inquiryType: 'demo',
      message: `資料請求：${resource.title}\n\nダウンロード希望資料：${resource.slug}`,
      sourcePage: normalizeText(body.sourcePage, 80) || `resource-${resource.slug}`,
      referrerPath: normalizeText(body.referrerPath, 300),
      source: 'hp_form',
    }

    let leadCaptured = false
    try {
      const delivery = await deliverContact(payload)
      leadCaptured =
        delivery.persisted.ok || delivery.notifications.some((result) => result.ok)
    } catch (error) {
      captureError(error, { area: 'resource-claim', slug: resource.slug })
    }

    return NextResponse.json({
      success: true,
      leadCaptured,
      downloadPath: staticDownloadPath,
      fallbackDownloadPath: apiDownloadPath,
    })
  } catch (error) {
    captureError(error, { area: 'resource-claim', slug: params.slug })
    return NextResponse.json({
      success: true,
      leadCaptured: false,
      downloadPath: staticDownloadPath,
      fallbackDownloadPath: apiDownloadPath,
    })
  }
}

function normalizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
