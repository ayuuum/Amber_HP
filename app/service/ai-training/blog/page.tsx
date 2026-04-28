import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getCategoryName, getCategoryPath } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'ブログ | 生成AI活用研修 | 株式会社Amber',
  description: '生成AI活用研修に関する記事一覧。人材開発支援助成金、カリキュラム設計、業界別活用、研修の落とし穴などの実務知見を発信しています。',
  keywords: ['生成AI研修', '人材開発支援助成金', 'AI研修', 'ChatGPT研修', '社員教育'],
  openGraph: {
    title: 'ブログ | 生成AI活用研修 | 株式会社Amber',
    description: '生成AI活用研修に関する記事一覧。人材開発支援助成金、カリキュラム設計、業界別活用、研修の落とし穴などの実務知見を発信しています。',
    url: `${siteUrl}/service/ai-training/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/service/ai-training/blog`,
  },
}

export default function TrainingBlogPage() {
  const posts = getAllPosts('training')

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-24 px-6 bg-color-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link
              href="/service/ai-training"
              className="text-link text-sm"
            >
              ← 生成AI活用研修に戻る
            </Link>
          </div>

          <div className="mb-16">
            <h1 className="page-heading mb-6">
              {getCategoryName('training')} ブログ
            </h1>
            <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
              人材開発支援助成金の活用、カリキュラム設計、業界別の研修事例、研修の落とし穴などの実務知見を記事として発信しています。
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="bg-color-bg p-12 rounded-sm border border-sequoia-black/10 text-center">
              <p className="text-sequoia-black text-lg">
                記事の準備中です。近日公開予定です。
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`${getCategoryPath('training')}/${post.slug}`}
                  className="bg-color-bg p-6 rounded-sm border border-sequoia-black/10 hover:shadow-lg transition-shadow block"
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
