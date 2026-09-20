import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ArticleCard from '@/components/ui/ArticleCard'
import { getAllPosts } from '@/lib/markdown'
import type { BlogPost, BlogCategory } from '@/lib/markdown'

function mergeLatestPosts(limit: number): { post: BlogPost; category: BlogCategory }[] {
  const development = getAllPosts('development')
  const training = getAllPosts('training')
  const merged = [
    ...development.map((post) => ({ post, category: 'development' as const })),
    ...training.map((post) => ({ post, category: 'training' as const })),
  ].sort((a, b) => (a.post.date < b.post.date ? 1 : -1))
  return merged.slice(0, limit)
}

/**
 * トップ用：最新記事を最大3件表示（記事がない場合は null を返す）
 */
export default function HomeNewsPreview() {
  const items = mergeLatestPosts(3)
  if (items.length === 0) {
    return null
  }

  const [featured, ...rest] = items

  return (
    <section
      id="insights"
      className="home-section scroll-mt-24 bg-[#F3F4F6]"
      aria-labelledby="home-insights-heading"
    >
      <div className="home-container">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 id="home-insights-heading" className="home-h2 mb-5">
              Insights.
            </h2>
            <p className="home-body max-w-2xl">現場で使える知見とアップデート。</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-green transition-colors hover:underline"
          >
            記事一覧を見る
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <div className="space-y-5 md:space-y-6">
          <ArticleCard post={featured.post} category={featured.category} featured />
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
      </div>
    </section>
  )
}
