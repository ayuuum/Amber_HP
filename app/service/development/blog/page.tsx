import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getCategoryName, getCategoryPath } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'ブログ | AIシステム開発 | 株式会社Amber',
  description: 'AIシステム開発に関する記事一覧。業務システム、生成AI活用、業務自動化、エージェント開発などの実務知見を発信しています。',
  keywords: ['AIシステム開発', '業務システム', '生成AI', '業務自動化', 'エージェント開発'],
  openGraph: {
    title: 'ブログ | AIシステム開発 | 株式会社Amber',
    description: 'AIシステム開発に関する記事一覧。業務システム、生成AI活用、業務自動化、エージェント開発などの実務知見を発信しています。',
    url: `${siteUrl}/service/development/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/service/development/blog`,
  },
}

export default function DevelopmentBlogPage() {
  const posts = getAllPosts('development')

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-24 px-6 bg-color-bg">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link
              href="/service/development"
              className="text-link text-sm"
            >
              ← AIシステム開発に戻る
            </Link>
          </div>

          <div className="mb-16">
            <h1 className="page-heading mb-6">
              {getCategoryName('development')} ブログ
            </h1>
          </div>

          {posts.length === 0 ? (
            <div className="surface-card p-12 text-center">
              <p className="text-sequoia-black text-lg">
                記事の準備中です。近日公開予定です。
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`${getCategoryPath('development')}/${post.slug}`}
                  className="surface-card interactive-card block p-6"
                >
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
