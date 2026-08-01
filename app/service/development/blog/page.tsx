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
  title: 'ブログ | AIシステム開発 | 株式会社Amber',
  description:
    'AIシステム開発に関する記事一覧。業務システム、生成AI活用、業務自動化、エージェント開発などの実務知見を発信しています。',
  keywords: ['AIシステム開発', '業務システム', '生成AI', '業務自動化', 'エージェント開発'],
  openGraph: {
    title: 'ブログ | AIシステム開発 | 株式会社Amber',
    description:
      'AIシステム開発に関する記事一覧。業務システム、生成AI活用、業務自動化、エージェント開発などの実務知見を発信しています。',
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
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="blue"
        eyebrow="AIシステム開発"
        headingLines={[`${getCategoryName('development')}`, 'の実務知見。']}
        body="業務システム、生成AI連携、業務自動化など、実装の現場から得た知見を公開しています。"
      />
      <section className="home-section bg-white pt-0 md:pt-0">
        <div className="home-container">
          <PageBreadcrumbs
            items={[
              { label: 'トップ', href: '/' },
              { label: 'AI活用の知見', href: '/blog' },
              { label: getCategoryName('development') },
            ]}
          />

          {posts.length === 0 ? (
            <p className="text-secondary">記事の準備中です。近日公開予定です。</p>
          ) : (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <ArticleCard post={post} category="development" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <ContactCTA source="blog" ctaLabel="自社業務へのAI活用について相談する" />
      <Footer />
    </main>
  )
}
