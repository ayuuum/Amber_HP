import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  isAdminAuthenticated,
  isSafeSlug,
  isValidBlogCategory,
  unauthorizedAdminResponse,
} from '@/lib/admin-auth'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

function requireAuth(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return unauthorizedAdminResponse()
  }
  return null
}

function escapeFrontmatter(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

// GET: 記事一覧取得
export async function GET(request: NextRequest) {
  const unauthorized = requireAuth(request)
  if (unauthorized) return unauthorized

  const { searchParams } = new URL(request.url)
  const categoryParam = searchParams.get('category')
  const categories =
    categoryParam && isValidBlogCategory(categoryParam)
      ? [categoryParam]
      : (['development', 'training'] as const)

  const articles: Array<{
    slug: string
    title: string
    category: string
    date: string
  }> = []

  for (const cat of categories) {
    const categoryDir = path.join(postsDirectory, cat)
    if (!fs.existsSync(categoryDir)) continue

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(categoryDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      articles.push({
        slug: file.replace(/\.md$/, ''),
        title: data.title || '',
        category: cat,
        date: data.date || '',
      })
    }
  }

  return NextResponse.json({ articles })
}

// POST: 記事作成
export async function POST(request: NextRequest) {
  const unauthorized = requireAuth(request)
  if (unauthorized) return unauthorized

  try {
    const { title, description, date, category, keywords, content, cover, coverAlt } =
      await request.json()

    if (!title || !content || !isValidBlogCategory(category)) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }

    const slug = String(title)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    if (!isSafeSlug(slug)) {
      return NextResponse.json({ error: 'Invalid slug generated from title' }, { status: 400 })
    }

    const categoryDir = path.join(postsDirectory, category)
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true })
    }

    const filePath = path.join(categoryDir, `${slug}.md`)

    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article already exists' }, { status: 409 })
    }

    const coverLine = cover ? `\ncover: "${escapeFrontmatter(String(cover))}"` : ''
    const coverAltLine = coverAlt ? `\ncoverAlt: "${escapeFrontmatter(String(coverAlt))}"` : ''

    const frontmatter = `---
title: "${escapeFrontmatter(String(title))}"
description: "${escapeFrontmatter(String(description || ''))}"
date: "${date || new Date().toISOString().split('T')[0]}"
category: "${category}"
keywords: ${JSON.stringify(keywords || [])}${coverLine}${coverAltLine}
---

${content}
`

    fs.writeFileSync(filePath, frontmatter, 'utf8')

    return NextResponse.json({ success: true, slug })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}

// PUT: 記事更新
export async function PUT(request: NextRequest) {
  const unauthorized = requireAuth(request)
  if (unauthorized) return unauthorized

  try {
    const { slug, category, title, description, date, keywords, content, cover, coverAlt } =
      await request.json()

    if (!isSafeSlug(slug) || !isValidBlogCategory(category) || !title || !content) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }

    const filePath = path.join(postsDirectory, category, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const coverLine = cover ? `\ncover: "${escapeFrontmatter(String(cover))}"` : ''
    const coverAltLine = coverAlt ? `\ncoverAlt: "${escapeFrontmatter(String(coverAlt))}"` : ''

    const frontmatter = `---
title: "${escapeFrontmatter(String(title))}"
description: "${escapeFrontmatter(String(description || ''))}"
date: "${date || new Date().toISOString().split('T')[0]}"
category: "${category}"
keywords: ${JSON.stringify(keywords || [])}${coverLine}${coverAltLine}
---

${content}
`

    fs.writeFileSync(filePath, frontmatter, 'utf8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

// DELETE: 記事削除
export async function DELETE(request: NextRequest) {
  const unauthorized = requireAuth(request)
  if (unauthorized) return unauthorized

  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const category = searchParams.get('category')

    if (!isSafeSlug(slug) || !isValidBlogCategory(category)) {
      return NextResponse.json({ error: 'Missing or invalid slug/category' }, { status: 400 })
    }

    const filePath = path.join(postsDirectory, category, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
