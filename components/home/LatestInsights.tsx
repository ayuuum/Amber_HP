import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, getCategoryName, getCategoryPath } from '@/lib/markdown'
import type { BlogPost, BlogCategory } from '@/lib/markdown'
import FadeUp from '@/components/home/FadeUp'

function mergeLatestPosts(limit: number): { post: BlogPost; category: BlogCategory }[] {
  const development = getAllPosts('development')
  const training = getAllPosts('training')
  return [
    ...development.map((post) => ({ post, category: 'development' as const })),
    ...training.map((post) => ({ post, category: 'training' as const })),
  ]
    .sort((a, b) => (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
}

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function LatestInsights() {
  const items = mergeLatestPosts(3)

  return (
    <section className="home-section bg-white" aria-labelledby="insights-heading">
      <div className="home-container">
        <FadeUp className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <h2 id="insights-heading" className="home-h2">
            AI活用の知見
          </h2>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:underline">
            一覧を見る
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </FadeUp>

        {items.length === 0 ? (
          <p className="text-sm text-secondary">記事を準備中です。</p>
        ) : (
          <FadeUp>
            <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
              {items.map(({ post, category }) => (
                <li key={`${category}-${post.slug}`}>
                  <Link
                    href={`${getCategoryPath(category)}/${post.slug}`}
                    className="group flex flex-col gap-2 py-5 transition-colors hover:bg-off-white/80 sm:flex-row sm:items-center sm:gap-6 sm:py-6"
                  >
                    <time className="shrink-0 text-sm tabular-nums text-secondary" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    <span className="shrink-0 text-xs font-medium text-brand-green sm:w-28">
                      {getCategoryName(category)}
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-medium text-sequoia-black group-hover:text-brand-green md:text-base">
                      {post.title}
                    </span>
                    <ArrowRight
                      className="hidden h-4 w-4 shrink-0 text-sequoia-black/25 group-hover:text-brand-green sm:block"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
