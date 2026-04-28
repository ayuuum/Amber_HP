import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/markdown'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl

  const developmentPosts = getAllPosts('development')
  const trainingPosts = getAllPosts('training')

  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service/development`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/ai-training`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service/development/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service/ai-training/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  const developmentBlogPosts: MetadataRoute.Sitemap = developmentPosts.map((post) => ({
    url: `${baseUrl}/service/development/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const trainingBlogPosts: MetadataRoute.Sitemap = trainingPosts.map((post) => ({
    url: `${baseUrl}/service/ai-training/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...pages,
    ...developmentBlogPosts,
    ...trainingBlogPosts,
  ]
}
