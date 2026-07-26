import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getPostBySlug,
  getAllPosts,
  getPostContentHtml,
  getCategoryName,
  getCategoryPath,
  getRelatedPosts,
} from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogContent from '@/components/BlogContent'
import JsonLd from '@/components/JsonLd'
import RelatedPosts from '@/components/blog/RelatedPosts'
import InquiryCTA from '@/components/blog/InquiryCTA'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts('development')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug('development', params.slug)

  if (!post) {
    return {
      title: '記事が見つかりません | 株式会社Amber',
    }
  }

  const imageUrl = '/opengraph-image'

  return {
    title: `${post.title} | ${getCategoryName('development')} ブログ | 株式会社Amber`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} | ${getCategoryName('development')} ブログ`,
      description: post.description,
      url: `${siteUrl}${getCategoryPath('development')}/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: '株式会社Amber',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${siteUrl}${getCategoryPath('development')}/${post.slug}`,
    },
  }
}

export default async function DevelopmentBlogPostPage({ params }: Props) {
  const post = getPostBySlug('development', params.slug)

  if (!post) {
    notFound()
  }

  const contentHtml = await getPostContentHtml(post.content)
  const relatedPosts = getRelatedPosts('development', post.slug, 3)
  const canonicalUrl = `${siteUrl}${getCategoryPath('development')}/${post.slug}`
  const blogIndexUrl = `${siteUrl}${getCategoryPath('development')}`
  const serviceUrl = `${siteUrl}/service/ai-solution`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ホーム',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: getCategoryName('development'),
            item: serviceUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${getCategoryName('development')} ブログ`,
            item: blogIndexUrl,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        mainEntityOfPage: canonicalUrl,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'ja-JP',
        keywords: post.keywords,
        image: [`${siteUrl}/opengraph-image`],
        author: {
          '@type': 'Organization',
          name: '株式会社Amber',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: '株式会社Amber',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/opengraph-image`,
          },
        },
        isPartOf: {
          '@type': 'Blog',
          name: `${getCategoryName('development')} ブログ`,
          url: blogIndexUrl,
        },
      },
    ],
  }

  return (
    <>
      <JsonLd id="jsonld-blogposting-development" data={jsonLd} />
      <Header />
      <main className="min-h-screen bg-white px-5 pb-24 pt-28 md:px-8">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-8">
            <Link href="/blog" className="text-sm text-brand-green hover:underline">
              ← AI活用の知見に戻る
            </Link>
          </div>

          <article>
            <header className="mb-10 border-b border-sequoia-black/8 pb-8">
              <div className="mb-4 flex flex-wrap gap-3 text-sm text-secondary">
                <span>{getCategoryName('development')}</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <h1 className="home-h2 mb-4 text-[1.75rem] md:text-[2.25rem]">{post.title}</h1>
              {post.description && (
                <p className="text-base leading-relaxed text-secondary md:text-lg">{post.description}</p>
              )}
            </header>

            <BlogContent html={contentHtml} />
          </article>

          <InquiryCTA category="development" />

          <RelatedPosts posts={relatedPosts} />
        </div>
      </main>
      <Footer />
    </>
  )
}
