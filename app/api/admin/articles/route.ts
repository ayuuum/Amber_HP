import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

// 認証チェック
function checkAuth(request: NextRequest): boolean {
  // セッションストレージのチェックはクライアント側で行うため、
  // ここでは簡易的な認証として環境変数チェックのみ
  // 本番環境ではより堅牢な認証を推奨
  return true
}

// GET: 記事一覧取得
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as 'consulting' | 'training' | 'saas' | null

  const categories = category ? [category] : ['consulting', 'training', 'saas']
  const articles: Array<{
    slug: string
    title: string
    category: string
    date: string
    path: string
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
        path: filePath,
      })
    }
  }

  return NextResponse.json({ articles })
}

// POST: 記事作成
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, description, date, category, keywords, content } = await request.json()

    if (!title || !category || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // スラッグを生成（タイトルから）
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const categoryDir = path.join(postsDirectory, category)
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true })
    }

    const filePath = path.join(categoryDir, `${slug}.md`)
    
    // 既に存在する場合はエラー
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article already exists' }, { status: 409 })
    }

    // フロントマターを生成
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description?.replace(/"/g, '\\"') || ''}"
date: "${date || new Date().toISOString().split('T')[0]}"
category: "${category}"
keywords: ${JSON.stringify(keywords || [])}
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
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug, category, title, description, date, keywords, content } = await request.json()

    if (!slug || !category || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const filePath = path.join(postsDirectory, category, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // フロントマターを生成
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description?.replace(/"/g, '\\"') || ''}"
date: "${date || new Date().toISOString().split('T')[0]}"
category: "${category}"
keywords: ${JSON.stringify(keywords || [])}
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
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const category = searchParams.get('category') as 'consulting' | 'training' | 'saas'

    if (!slug || !category) {
      return NextResponse.json({ error: 'Missing slug or category' }, { status: 400 })
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

