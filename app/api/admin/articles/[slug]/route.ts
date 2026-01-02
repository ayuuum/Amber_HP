import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/markdown'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as 'consulting' | 'training' | 'saas'

  if (!category) {
    return NextResponse.json({ error: 'Category is required' }, { status: 400 })
  }

  const post = getPostBySlug(category, params.slug)

  if (!post) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json({ article: post })
}


