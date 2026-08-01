import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactCTA from '@/components/ui/ContactCTA'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import { getAllPosts } from '@/lib/markdown'
import type { BlogPost, BlogCategory } from '@/lib/markdown'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: 'AI活用の知見',
  description: 'AI活用を実務に落とし込むための知見とアップデートをお届けします。',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: 'AI活用の知見 | 株式会社Amber',
    description: 'AI活用を実務に落とし込むための知見とアップデート。',
    url: `${siteUrl}/blog`,
    type: 'website',
  },
}

export default function BlogPage() {
  const developmentPosts = getAllPosts('development')
  const trainingPosts = getAllPosts('training')
  const posts: { post: BlogPost; category: BlogCategory }[] = [
    ...developmentPosts.map((post) => ({ post, category: 'development' as const })),
    ...trainingPosts.map((post) => ({ post, category: 'training' as const })),
  ].sort((a, b) => (a.post.date < b.post.date ? 1 : -1))

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="offwhite"
        eyebrow="AI活用の知見"
        headingLines={['AI活用を、', '実務に落とし込むための知見。']}
        body="現場で使えるAI活用の考え方、研修、実装の知見を公開しています。"
      />
      <section className="home-section bg-white pt-0 md:pt-0">
        <div className="home-container">
          <PageBreadcrumbs items={[{ label: 'トップ', href: '/' }, { label: 'AI活用の知見' }]} />

          {posts.length === 0 ? (
            <p className="text-secondary">現在、記事を準備中です。</p>
          ) : (
            <>
              {featured ? (
                <div className="mb-10">
                  <ArticleCard post={featured.post} category={featured.category} featured />
                </div>
              ) : null}
              {rest.length > 0 ? (
                <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map(({ post, category }) => (
                    <li key={`${category}-${post.slug}`}>
                      <ArticleCard post={post} category={category} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="max-w-2xl text-sm leading-relaxed text-secondary">
                  現在公開中の記事は上記の1本です。現場で使えるAI活用の知見を、今後も追加していきます。
                </p>
              )}
            </>
          )}
        </div>
      </section>
      <ContactCTA source="blog" ctaLabel="自社業務へのAI活用について相談する" />
      <Footer />
    </main>
  )
}
