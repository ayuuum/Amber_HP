import { createHmac, timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const ADMIN_SESSION_COOKIE = 'amber_admin_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 12 // 12 hours
export const BLOG_CATEGORIES = ['development', 'training'] as const
export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]

function getSessionSecret(): string | null {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    null
  return secret && secret.length >= 8 ? secret : null
}

export function getAdminPassword(): string | null {
  const password = process.env.ADMIN_PASSWORD
  if (!password || password.length < 8) return null
  if (password === 'admin123') return null
  return password
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function createAdminSessionToken(): string | null {
  const secret = getSessionSecret()
  if (!secret) return null
  const exp = Date.now() + SESSION_TTL_MS
  const payload = Buffer.from(JSON.stringify({ exp }), 'utf8').toString('base64url')
  return `${payload}.${sign(payload, secret)}`
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false
  const secret = getSessionSecret()
  if (!secret) return false

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  if (!safeEqual(signature, sign(payload, secret))) return false

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number }
    return typeof data.exp === 'number' && data.exp > Date.now()
  } catch {
    return false
  }
}

export function isAdminAuthenticated(request: NextRequest): boolean {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
}

export function unauthorizedAdminResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export function setAdminSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  })
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
}

export function isValidBlogCategory(value: unknown): value is BlogCategoryId {
  return typeof value === 'string' && (BLOG_CATEGORIES as readonly string[]).includes(value)
}

export function isSafeSlug(value: unknown): value is string {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(value) && value.length <= 120
}

export function passwordsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) {
    // Still run a compare to reduce timing leaks on length mismatch paths.
    timingSafeEqual(Buffer.alloc(b.length), b)
    return false
  }
  return timingSafeEqual(a, b)
}
