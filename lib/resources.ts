import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const resourcesDirectory = path.join(process.cwd(), 'content', 'resources')

export type ResourceItem = {
  slug: string
  title: string
  description: string
  fileName: string
  keywords: string[]
  relatedArticleSlugs: string[]
  content: string
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

export function getAllResources(): ResourceItem[] {
  if (!fs.existsSync(resourcesDirectory)) {
    return []
  }

  return fs
    .readdirSync(resourcesDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return getResourceBySlug(slug)
    })
    .filter((item): item is ResourceItem => item !== null)
    .sort((a, b) => a.title.localeCompare(b.title, 'ja'))
}

export function getResourceBySlug(slug: string): ResourceItem | null {
  const fullPath = path.join(resourcesDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const title = optionalString(data.title) || slug
  const description = optionalString(data.description) || ''
  const fileName = optionalString(data.fileName) || `${slug}.md`
  const keywords = Array.isArray(data.keywords)
    ? data.keywords.filter((item): item is string => typeof item === 'string')
    : []
  const relatedArticleSlugs = Array.isArray(data.relatedArticleSlugs)
    ? data.relatedArticleSlugs.filter((item): item is string => typeof item === 'string')
    : []

  return {
    slug,
    title,
    description,
    fileName,
    keywords,
    relatedArticleSlugs,
    content: content.trim(),
  }
}

export { getResourceDownloadPath, getResourcePagePath } from '@/lib/resource-paths'
