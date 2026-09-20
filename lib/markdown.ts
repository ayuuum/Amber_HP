import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { companyInfo } from '@/lib/company-info'

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
  author: string
  authorTitle: string
  dateModified?: string
  /** 記事末尾CTA（任意） */
  ctaTitle?: string
  ctaDescription?: string
  ctaLabel?: string
  ctaSource?: string
  ctaInquiry?: string
  resourceSlug?: string
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
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
    cover: optionalString(data.cover),
    coverAlt: optionalString(data.coverAlt),
    author: optionalString(data.author) ?? companyInfo.representativeName,
    authorTitle: optionalString(data.authorTitle) ?? companyInfo.representativeTitle,
    dateModified: optionalString(data.dateModified),
    ctaTitle: optionalString(data.ctaTitle),
    ctaDescription: optionalString(data.ctaDescription),
    ctaLabel: optionalString(data.ctaLabel),
    ctaSource: optionalString(data.ctaSource),
    ctaInquiry: optionalString(data.ctaInquiry),
    resourceSlug: optionalString(data.resourceSlug),
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

/** カテゴリ横断で slug から記事を探す（canonical は /blog/[slug]） */
export function getPostByAnySlug(slug: string): BlogPost | null {
  return getPostBySlug('development', slug) ?? getPostBySlug('training', slug)
}

export function getAllPostSlugs(): { slug: string; category: BlogCategory }[] {
  return (['development', 'training'] as const).flatMap((category) =>
    getAllPosts(category).map((post) => ({ slug: post.slug, category }))
  )
}

export async function getPostContentHtml(content: string): Promise<string> {
  // 記事ヘッダーでタイトルを出すため、本文先頭の H1 は重複表示を避ける
  const withoutLeadingH1 = content.replace(/^\s*#\s+[^\n]+\n+/, '')

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(withoutLeadingH1)

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
    development: 'AI・業務システム',
    training: '生成AI研修',
  }
  return names[category]
}

export function getCategoryListPath(category: BlogCategory): string {
  const paths: Record<BlogCategory, string> = {
    development: '/blog?category=development',
    training: '/blog?category=training',
  }
  return paths[category]
}

/** 個別記事のベースパス（末尾スラッシュなし）。正本は /blog */
export function getCategoryPath(_category?: BlogCategory): string {
  return '/blog'
}

/** 記事の canonical パス */
export function getPostPath(slug: string, _category?: BlogCategory): string {
  return `/blog/${slug}`
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
