import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getCategoryName, getCategoryPath } from '@/lib/markdown'
import type { BlogPost } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'ニュース・ブログ | 株式会社Amber',
  description: 'AI導入支援、法人向け生成AI研修、ホームサービス向け業務システムなど、Amberの実務知見やニュースをお届けします。',
  keywords: ['Amber', 'ブログ', 'AI導入支援', '生成AI研修', '業務システム', '業務効率化'],
  openGraph: {
    title: 'ニュース・ブログ | 株式会社Amber',
    description: 'AI導入支援、法人向け生成AI研修、ホームサービス向け業務システムなど、Amberの実務知見やニュースをお届けします。',
    url: `${siteUrl}/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
}

export default function BlogPage() {
  const consultingPosts = getAllPosts('consulting')
  const trainingPosts = getAllPosts('training')
  const saasPosts = getAllPosts('saas')

  const postsWithCategory: { post: BlogPost; category: 'consulting' | 'training' | 'saas' }[] = [
    ...consultingPosts.map((post) => ({ post, category: 'consulting' as const })),
    ...trainingPosts.map((post) => ({ post, category: 'training' as const })),
    ...saasPosts.map((post) => ({ post, category: 'saas' as const })),
  ].sort((a, b) => (a.post.date < b.post.date ? 1 : -1))

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link
              href="/"
              className="text-deep-forest-green hover:text-deep-forest-green transition-colors"
            >
              ← トップに戻る
            </Link>
          </div>

          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
              ニュース・ブログ
            </h1>
            <p className="text-xl text-deep-forest-green leading-relaxed">
              AI導入支援、生成AI研修、ホームサービス向け業務システムなど、実務に役立つ知見をお届けします。
            </p>
          </div>

          {postsWithCategory.length === 0 ? (
            <div className="bg-white p-12 rounded-sm border border-deep-forest-green text-center">
              <p className="text-deep-forest-green text-lg">
                記事の準備中です。近日公開予定です。
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsWithCategory.map(({ post, category }) => (
                <Link
                  key={`${category}-${post.slug}`}
                  href={`${getCategoryPath(category)}/${post.slug}`}
                  className="bg-white p-6 rounded-sm border border-deep-forest-green hover:shadow-lg transition-shadow block"
                >
                  <div className="mb-2">
                    <span className="text-xs text-deep-forest-green/80 font-medium">
                      {getCategoryName(category)}
                    </span>
                  </div>
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
                        className="text-xs bg-deep-forest-green/10 text-deep-forest-green px-2 py-1 rounded-sm"
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
