import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, getPostContentHtml, getCategoryName, getCategoryPath } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogContent from '@/components/BlogContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts('saas')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug('saas', params.slug)

  if (!post) {
    return {
      title: '記事が見つかりません | 株式会社Amber',
    }
  }

  return {
    title: `${post.title} | ${getCategoryName('saas')} ブログ | 株式会社Amber`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} | ${getCategoryName('saas')} ブログ`,
      description: post.description,
      url: `${siteUrl}${getCategoryPath('saas')}/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `${siteUrl}${getCategoryPath('saas')}/${post.slug}`,
    },
  }
}

export default async function SaaSBlogPostPage({ params }: Props) {
  const post = getPostBySlug('saas', params.slug)

  if (!post) {
    notFound()
  }

  const contentHtml = await getPostContentHtml(post.content)

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href={getCategoryPath('saas')}
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
                  {getCategoryName('saas')}
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
              href={getCategoryPath('saas')}
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

