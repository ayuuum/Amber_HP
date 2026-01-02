import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getCategoryName, getCategoryPath } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amber-inc.com'

export const metadata: Metadata = {
  title: 'ブログ | 法人向け生成AI研修 | 株式会社Amber',
  description: '法人向け生成AI研修に関する記事一覧。ChatGPT活用、生成AI教育、リスキリングなどの実務知見を発信しています。',
  keywords: ['生成AI研修', 'ChatGPT研修', '生成AI教育', 'リスキリング', '法人研修'],
  openGraph: {
    title: 'ブログ | 法人向け生成AI研修 | 株式会社Amber',
    description: '法人向け生成AI研修に関する記事一覧。ChatGPT活用、生成AI教育、リスキリングなどの実務知見を発信しています。',
    url: `${siteUrl}/service/training/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/service/training/blog`,
  },
}

export default function TrainingBlogPage() {
  const posts = getAllPosts('training')

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link 
              href="/service/training" 
              className="text-deep-forest-green hover:text-deep-forest-green transition-colors"
            >
              ← 法人向け生成AI研修に戻る
            </Link>
          </div>

          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
              {getCategoryName('training')} ブログ
            </h1>
            <p className="text-xl text-deep-forest-green leading-relaxed">
              法人向け生成AI研修に関する記事を発信しています。<br />
              実務で使える生成AIの活用法を、記事としてお届けします。
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="bg-white p-12 rounded-sm border border-deep-forest-green text-center">
              <p className="text-deep-forest-green text-lg">
                記事の準備中です。近日公開予定です。
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`${getCategoryPath('training')}/${post.slug}`}
                  className="bg-white p-6 rounded-sm border border-deep-forest-green hover:shadow-lg transition-shadow block"
                >
                  <div className="mb-4">
                    <span className="text-sm text-deep-forest-green font-semibold">
                      {new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-deep-forest-green mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-deep-forest-green text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className="text-xs bg-white/30 text-deep-forest-green px-2 py-1 rounded-sm"
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


