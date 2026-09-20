import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getPostBySlug,
  getAllPosts,
  getPostContentHtml,
  getCategoryName,
  getCategoryPath,
  getCategoryListPath,
  getRelatedPosts,
} from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogContent from '@/components/BlogContent'
import JsonLd from '@/components/JsonLd'
import RelatedPosts from '@/components/blog/RelatedPosts'
import InquiryCTA from '@/components/blog/InquiryCTA'
import BlogAuthorCard from '@/components/blog/BlogAuthorCard'
import BlogArticleHeader, { BlogBackLink } from '@/components/blog/BlogArticleHeader'
import type { ContactInquiryType } from '@/lib/contact'

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

  const imageUrl = post.cover || '/opengraph-image'
  const imageAlt = post.coverAlt || post.title

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
          alt: imageAlt,
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
  const blogIndexUrl = `${siteUrl}${getCategoryListPath('development')}`
  const serviceUrl = `${siteUrl}/service/ai-solution`
  const ogImage = post.cover
    ? post.cover.startsWith('http')
      ? post.cover
      : `${siteUrl}${post.cover}`
    : `${siteUrl}/opengraph-image`

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
        dateModified: post.dateModified || post.date,
        inLanguage: 'ja-JP',
        keywords: post.keywords,
        image: [ogImage],
        author: {
          '@type': 'Person',
          name: post.author,
          jobTitle: post.authorTitle,
          url: `${siteUrl}/company#representative`,
          worksFor: {
            '@type': 'Organization',
            name: '株式会社Amber',
            url: siteUrl,
          },
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
      <main className="min-h-screen bg-gradient-to-b from-off-white/40 via-white to-white px-5 pb-24 pt-28 md:px-8">
        <div className="mx-auto max-w-[760px]">
          <BlogBackLink />
          <article>
            <BlogArticleHeader post={post} category="development" />
            <BlogContent html={contentHtml} />
          </article>

          <BlogAuthorCard author={post.author} authorTitle={post.authorTitle} />

          <InquiryCTA
            category="development"
            title={post.ctaTitle}
            description={post.ctaDescription}
            label={post.ctaLabel}
            source={post.ctaSource || 'blog'}
            inquiry={(post.ctaInquiry as ContactInquiryType | undefined) || 'ai-solution'}
            resourceSlug={post.resourceSlug}
          />

          <RelatedPosts posts={relatedPosts} />
        </div>
      </main>
      <Footer />
    </>
  )
}
