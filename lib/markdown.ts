import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  category: 'consulting' | 'training' | 'saas'
  keywords: string[]
  content: string
  excerpt?: string
}

export function getAllPosts(category?: 'consulting' | 'training' | 'saas'): BlogPost[] {
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

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        category: data.category || category || 'consulting',
        keywords: data.keywords || [],
        content,
        excerpt: data.excerpt || content.substring(0, 150) + '...',
      } as BlogPost
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
  category: 'consulting' | 'training' | 'saas',
  slug: string
): BlogPost | null {
  const fullPath = path.join(postsDirectory, category, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    category: data.category || category,
    keywords: data.keywords || [],
    content,
    excerpt: data.excerpt || content.substring(0, 150) + '...',
  } as BlogPost
}

export async function getPostContentHtml(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return processedContent.toString()
}

export function getCategoryName(category: 'consulting' | 'training' | 'saas'): string {
  const names = {
    consulting: 'AI顧問サービス',
    training: '法人向け生成AI研修',
    saas: 'ホームサービス向けVertical SaaS',
  }
  return names[category]
}

export function getCategoryPath(category: 'consulting' | 'training' | 'saas'): string {
  return `/service/${category}/blog`
}

