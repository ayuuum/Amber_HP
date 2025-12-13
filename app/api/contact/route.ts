import { NextRequest, NextResponse } from 'next/server'
import { getClient } from '@/lib/microcms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const client = getClient()
    
    // microCMSのCONTACTエンドポイントに送信
    // 実際のエンドポイント名はmicroCMSの設定に合わせて変更してください
    const result = await client.create({
      endpoint: 'contact',
      content: {
        name: body.name,
        company: body.company,
        email: body.email,
        phone: body.phone,
        inquiryType: body.inquiryType,
        message: body.message,
      },
    })

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: '送信に失敗しました' },
      { status: 500 }
    )
  }
}

