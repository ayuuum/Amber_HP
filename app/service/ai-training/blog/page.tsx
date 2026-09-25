import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactCTA from '@/components/ui/ContactCTA'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import { getAllPosts, getCategoryName } from '@/lib/markdown'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: 'ブログ | 生成AI活用研修 | 株式会社Amber',
  description:
    '生成AI活用研修に関する記事一覧。人材開発支援助成金、カリキュラム設計、業界別活用、研修の落とし穴などの実務知見を発信しています。',
  keywords: ['生成AI研修', '人材開発支援助成金', 'AI研修', 'ChatGPT研修', '社員教育'],
  openGraph: {
    title: 'ブログ | 生成AI活用研修 | 株式会社Amber',
    description:
      '生成AI活用研修に関する記事一覧。人材開発支援助成金、カリキュラム設計、業界別活用、研修の落とし穴などの実務知見を発信しています。',
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
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="green"
        eyebrow="Training"
        headingLines={[`${getCategoryName('training')}`, 'の実務知見。']}
        body="生成AI研修の設計、助成金活用、現場定着の考え方を公開しています。"
      />
      <section className="home-section bg-[#F3F4F6] pt-0 md:pt-0">
        <div className="home-container">
          <PageBreadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'AI活用の知見', href: '/blog' },
              { label: getCategoryName('training') },
            ]}
          />

          {posts.length === 0 ? (
            <p className="text-secondary">記事の準備中です。近日公開予定です。</p>
          ) : (
            <div className="space-y-6 md:space-y-8">
              <ArticleCard post={posts[0]} category="training" featured />
              {posts.length > 1 ? (
                <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10 bg-white">
                  {posts.slice(1).map((post) => (
                    <li key={post.slug}>
                      <ArticleCard post={post} category="training" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </section>
      <ContactCTA source="blog" ctaLabel="Talk to Amber" />
      <Footer />
    </main>
  )
}
