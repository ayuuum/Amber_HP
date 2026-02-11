import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/markdown'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl

  // ブログ記事を取得
  const consultingPosts = getAllPosts('consulting')
  const trainingPosts = getAllPosts('training')
  const saasPosts = getAllPosts('saas')

  // 基本ページ
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
      url: `${baseUrl}/service/consulting`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/training`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/saas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // ブログ一覧ページ
    {
      url: `${baseUrl}/service/consulting/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service/training/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service/saas/blog`,
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
    {
      url: `${baseUrl}/recruit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // AI導入支援向けブログ記事
  const consultingBlogPosts: MetadataRoute.Sitemap = consultingPosts.map((post) => ({
    url: `${baseUrl}/service/consulting/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 生成AI研修向けブログ記事
  const trainingBlogPosts: MetadataRoute.Sitemap = trainingPosts.map((post) => ({
    url: `${baseUrl}/service/training/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // ホームサービス向け業務システム向けブログ記事
  const saasBlogPosts: MetadataRoute.Sitemap = saasPosts.map((post) => ({
    url: `${baseUrl}/service/saas/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...pages,
    ...consultingBlogPosts,
    ...trainingBlogPosts,
    ...saasBlogPosts,
  ]
}

