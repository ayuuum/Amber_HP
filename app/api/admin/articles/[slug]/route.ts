import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/markdown'
import {
  isAdminAuthenticated,
  isSafeSlug,
  isValidBlogCategory,
  unauthorizedAdminResponse,
} from '@/lib/admin-auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated(request)) {
    return unauthorizedAdminResponse()
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  if (!isValidBlogCategory(category) || !isSafeSlug(params.slug)) {
    return NextResponse.json({ error: 'Invalid category or slug' }, { status: 400 })
  }

  const post = getPostBySlug(category, params.slug)

  if (!post) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json({ article: post })
}
