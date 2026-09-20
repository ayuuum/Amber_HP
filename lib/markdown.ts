import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

export type BlogCategory = 'development' | 'training'

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  category: BlogCategory
  keywords: string[]
  content: string
  excerpt?: string
  /** カバー画像パス（例: /images/brand/consulting-hero.png） */
  cover?: string
  coverAlt?: string
}

function toBlogPost(
  slug: string,
  data: Record<string, unknown>,
  content: string,
  fallbackCategory?: BlogCategory
): BlogPost {
  const category = (data.category as BlogCategory) || fallbackCategory || 'development'
  return {
    slug,
    title: (data.title as string) || '',
    description: (data.description as string) || '',
    date: (data.date as string) || '',
    category,
    keywords: (data.keywords as string[]) || [],
    content,
    excerpt: (data.excerpt as string) || content.substring(0, 150) + '...',
    cover: typeof data.cover === 'string' && data.cover.trim() ? data.cover.trim() : undefined,
    coverAlt:
      typeof data.coverAlt === 'string' && data.coverAlt.trim()
        ? data.coverAlt.trim()
        : undefined,
  }
}

export function getAllPosts(category?: BlogCategory): BlogPost[] {
  const categoryDir = category
    ? path.join(postsDirectory, category)
    : postsDirectory

  if (!fs.existsSync(categoryDir)) {
    return []
  }

  const fileNames = fs.readdirSync(categoryDir)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(categoryDir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return toBlogPost(slug, data, content, category)
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(
  category: BlogCategory,
  slug: string
): BlogPost | null {
  const fullPath = path.join(postsDirectory, category, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return toBlogPost(slug, data, content, category)
}

export async function getPostContentHtml(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return processedContent.toString()
}

/** 日本語記事向けの粗い読了時間（分）。400字/分想定。 */
export function getReadingTimeMinutes(content: string): number {
  const text = content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/[#>*`\[\]()_-]/g, '')
    .replace(/\s+/g, '')
  const chars = text.length
  return Math.max(1, Math.ceil(chars / 400))
}

export function getCategoryName(category: BlogCategory): string {
  const names: Record<BlogCategory, string> = {
    development: 'AIシステム開発',
    training: '生成AI活用研修',
  }
  return names[category]
}

export function getCategoryPath(category: BlogCategory): string {
  const paths: Record<BlogCategory, string> = {
    development: '/service/development/blog',
    training: '/service/ai-training/blog',
  }
  return paths[category]
}

/** 記事末尾の関連記事用：同カテゴリ最新N件から自分自身を除く */
export function getRelatedPosts(
  category: BlogCategory,
  currentSlug: string,
  limit = 3
): BlogPost[] {
  return getAllPosts(category)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit)
}
