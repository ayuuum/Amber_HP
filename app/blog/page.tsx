import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactCTA from '@/components/ui/ContactCTA'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import { getAllPosts, getCategoryName, type BlogPost, type BlogCategory } from '@/lib/markdown'
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

function parseCategory(value: string | string[] | undefined): BlogCategory | null {
  const raw = Array.isArray(value) ? value[0] : value
  if (raw === 'development' || raw === 'training') return raw
  return null
}

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string | string[] }
}) {
  const selectedCategory = parseCategory(searchParams?.category)
  const developmentPosts = getAllPosts('development')
  const trainingPosts = getAllPosts('training')
  const posts: { post: BlogPost; category: BlogCategory }[] = [
    ...developmentPosts.map((post) => ({ post, category: 'development' as const })),
    ...trainingPosts.map((post) => ({ post, category: 'training' as const })),
  ]
    .filter(({ category }) => (selectedCategory ? category === selectedCategory : true))
    .sort((a, b) => (a.post.date < b.post.date ? 1 : -1))

  const featured = posts[0]
  const rest = posts.slice(1)
  const filterLabel = selectedCategory ? getCategoryName(selectedCategory) : null

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="offwhite"
        eyebrow="Insights"
        headingLines={['AI活用を、', '実務に落とし込むための知見。']}
        body="現場で使えるAI活用の考え方、研修、実装の知見を公開しています。"
      />
      <section className="home-section bg-[#F3F4F6] pt-0 md:pt-0">
        <div className="home-container">
          <PageBreadcrumbs
            items={[
              { label: 'トップ', href: '/' },
              { label: 'AI活用の知見', href: filterLabel ? '/blog' : undefined },
              ...(filterLabel ? [{ label: filterLabel }] : []),
            ]}
          />

          <div className="mb-8 flex flex-wrap gap-3">
            <a
              href="/blog"
              className={`text-sm ${!selectedCategory ? 'font-medium text-brand-green' : 'text-secondary hover:text-sequoia-black'}`}
            >
              すべて
            </a>
            <a
              href="/blog?category=development"
              className={`text-sm ${selectedCategory === 'development' ? 'font-medium text-brand-green' : 'text-secondary hover:text-sequoia-black'}`}
            >
              {getCategoryName('development')}
            </a>
            <a
              href="/blog?category=training"
              className={`text-sm ${selectedCategory === 'training' ? 'font-medium text-brand-green' : 'text-secondary hover:text-sequoia-black'}`}
            >
              {getCategoryName('training')}
            </a>
          </div>

          {posts.length === 0 ? (
            <p className="text-secondary">現在、記事を準備中です。</p>
          ) : (
            <div className="space-y-6 md:space-y-8">
              {featured ? (
                <ArticleCard post={featured.post} category={featured.category} featured />
              ) : null}
              {rest.length > 0 ? (
                <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10 bg-white">
                  {rest.map(({ post, category }) => (
                    <li key={`${category}-${post.slug}`}>
                      <ArticleCard post={post} category={category} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </section>
      <ContactCTA source="blog" ctaLabel="自社業務へのAI活用について相談する" />
      <Footer />
    </main>
  )
}
