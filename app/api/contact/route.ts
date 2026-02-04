import { NextRequest, NextResponse } from 'next/server'

/**
 * お問い合わせフォーム API
 * 送信データを Google Apps Script (GAS) の Web アプリに転送します。
 * GAS 側で Google Sheets への追記とメール通知を行います。
 * セットアップ手順は docs/contact-form-gas-setup.md を参照してください。
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('Contact form: CONTACT_FORM_WEBHOOK_URL is not set')
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
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Contact form GAS error:', response.status, text)
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
