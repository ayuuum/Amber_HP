import { NextRequest, NextResponse } from 'next/server'
import {
  clearAdminSessionCookie,
  createAdminSessionToken,
  getAdminPassword,
  passwordsMatch,
  setAdminSessionCookie,
} from '@/lib/admin-auth'
import { getClientIp, rateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const limited = rateLimit(`admin-auth:${ip}`, 10, 15 * 60 * 1000)
    if (!limited.ok) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts' },
        { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } }
      )
    }

    const adminPassword = getAdminPassword()
    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Admin password is not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const password = typeof body.password === 'string' ? body.password : ''

    if (!passwordsMatch(password, adminPassword)) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const token = createAdminSessionToken()
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Admin session secret is not configured' },
        { status: 503 }
      )
    }

    const response = NextResponse.json({ success: true })
    setAdminSessionCookie(response, token)
    return response
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  clearAdminSessionCookie(response)
  return response
}
