import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/markdown'
import { getAllCaseSlugs } from '@/data/cases'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl
  const developmentPosts = getAllPosts('development')
  const trainingPosts = getAllPosts('training')

  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/service/ai-solution`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/cases`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/company`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/service/development/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/service/ai-training/blog`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    // 個別研修LPは主ナビ外のため優先度を下げる
    { url: `${baseUrl}/service/ai-training/copilot`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/service/ai-training/chatgpt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/service/ai-training/gemini`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/service/ai-training/claude-code`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/legal/tokushoho`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/fire-ops`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const casePages: MetadataRoute.Sitemap = getAllCaseSlugs().map((slug) => ({
    url: `${baseUrl}/cases/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const developmentBlogPosts: MetadataRoute.Sitemap = developmentPosts.map((post) => ({
    url: `${baseUrl}/service/development/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const trainingBlogPosts: MetadataRoute.Sitemap = trainingPosts.map((post) => ({
    url: `${baseUrl}/service/ai-training/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  return [...pages, ...casePages, ...developmentBlogPosts, ...trainingBlogPosts]
}
