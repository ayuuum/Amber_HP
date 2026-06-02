import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, getCategoryName, getCategoryPath } from '@/lib/markdown'
import type { BlogPost, BlogCategory } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { placeholders } from '@/lib/placeholder-images'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'ニュース・ブログ | 株式会社Amber',
  description: 'AI導入支援、ホームサービス向け業務システムなど、Amberの実務知見やニュースをお届けします。',
  keywords: ['Amber', 'ブログ', 'AI導入支援', '業務システム', '業務効率化'],
  openGraph: {
    title: 'ニュース・ブログ | 株式会社Amber',
    description: 'AI導入支援、ホームサービス向け業務システムなど、Amberの実務知見やニュースをお届けします。',
    url: `${siteUrl}/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
}

export default function BlogPage() {
  const developmentPosts = getAllPosts('development')
  const trainingPosts = getAllPosts('training')

  const postsWithCategory: { post: BlogPost; category: BlogCategory }[] = [
    ...developmentPosts.map((post) => ({ post, category: 'development' as const })),
    ...trainingPosts.map((post) => ({ post, category: 'training' as const })),
  ].sort((a, b) => (a.post.date < b.post.date ? 1 : -1))

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-24 px-6 bg-color-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link
              href="/"
              className="text-link text-sm"
            >
              トップに戻る
            </Link>
          </div>

          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-sequoia-black mb-6">
              ニュース・ブログ
            </h1>
          </div>

          <div className="mb-14 max-w-4xl">
            <div className="relative aspect-[21/9] max-h-48 w-full rounded-sm overflow-hidden border border-sequoia-black/10 shadow-sm bg-sequoia-black/5">
              <Image
                src={placeholders.writing}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>

          {postsWithCategory.length === 0 ? (
            <div className="bg-color-bg p-12 rounded-sm border border-sequoia-black/10 text-center">
              <p className="text-sequoia-black text-lg">
                現在、記事を執筆中です。
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsWithCategory.map(({ post, category }) => (
                <Link
                  key={`${category}-${post.slug}`}
                  href={`${getCategoryPath(category)}/${post.slug}`}
                  className="rounded-sm border border-sequoia-black/10 bg-color-bg shadow-sm interactive-card block p-6"
                >
                  <div className="mb-2">
                    <span className="text-xs text-sequoia-black/90 font-medium">
                      {getCategoryName(category)}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm text-sequoia-black font-semibold">
                      {new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-sequoia-black mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sequoia-black text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className="text-xs bg-sequoia-black/10 text-sequoia-black px-2 py-1 rounded-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
