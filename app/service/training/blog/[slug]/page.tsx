import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, getPostContentHtml, getCategoryName, getCategoryPath } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogContent from '@/components/BlogContent'
import JsonLd from '@/components/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts('training')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug('training', params.slug)

  if (!post) {
    return {
      title: '記事が見つかりません | 株式会社Amber',
    }
  }

  const imageUrl = '/og-image.jpg'

  return {
    title: `${post.title} | ${getCategoryName('training')} ブログ | 株式会社Amber`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} | ${getCategoryName('training')} ブログ`,
      description: post.description,
      url: `${siteUrl}${getCategoryPath('training')}/${post.slug}`,
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
      canonical: `${siteUrl}${getCategoryPath('training')}/${post.slug}`,
    },
  }
}

export default async function TrainingBlogPostPage({ params }: Props) {
  const post = getPostBySlug('training', params.slug)

  if (!post) {
    notFound()
  }

  const contentHtml = await getPostContentHtml(post.content)
  const canonicalUrl = `${siteUrl}${getCategoryPath('training')}/${post.slug}`
  const blogIndexUrl = `${siteUrl}${getCategoryPath('training')}`
  const serviceUrl = `${siteUrl}/service/training`

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
            name: '法人向け生成AI研修',
            item: serviceUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${getCategoryName('training')} ブログ`,
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
        image: [`${siteUrl}/og-image.jpg`],
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
            url: `${siteUrl}/og-image.jpg`,
          },
        },
        isPartOf: {
          '@type': 'Blog',
          name: `${getCategoryName('training')} ブログ`,
          url: blogIndexUrl,
        },
      },
    ],
  }

  return (
    <>
      <JsonLd id="jsonld-blogposting-training" data={jsonLd} />
      <Header />
      <main className="min-h-screen pt-24 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href={getCategoryPath('training')}
              className="text-deep-forest-green hover:text-deep-forest-green transition-colors"
            >
              ← ブログ一覧に戻る
            </Link>
          </div>

          <article className="bg-white p-8 md:p-12 rounded-sm border border-deep-forest-green">
            <header className="mb-8">
              <div className="mb-4">
                <span className="text-sm text-deep-forest-green font-semibold">
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="text-sm text-deep-forest-green ml-4">
                  {getCategoryName('training')}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-deep-forest-green mb-4">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-xl text-deep-forest-green leading-relaxed">
                  {post.description}
                </p>
              )}
              {post.keywords.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white/30 text-deep-forest-green px-3 py-1 rounded-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <BlogContent html={contentHtml} />
          </article>

          <div className="mt-12 text-center">
            <Link
              href={getCategoryPath('training')}
              className="inline-block bg-deep-forest-green text-white px-8 py-4 rounded-sm hover:bg-deep-forest-green transition-colors font-semibold"
            >
              ブログ一覧に戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

