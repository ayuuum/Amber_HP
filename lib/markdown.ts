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

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        category: data.category || category || 'development',
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
  category: BlogCategory,
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
