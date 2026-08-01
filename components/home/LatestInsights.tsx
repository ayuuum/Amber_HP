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
  const featured = items[0]

  if (!featured) {
    return null
  }

  // 記事が少ない場合は「ハブが空」に見えないよう、1本特集にする
  if (items.length === 1) {
    return (
      <section className="home-section bg-white" aria-labelledby="insights-heading">
        <div className="home-container">
          <FadeUp className="mb-8 max-w-3xl md:mb-10">
            <h2 id="insights-heading" className="home-h2 mb-4">
              AI活用の知見
            </h2>
            <p className="home-body">現場で使えるAI活用の考え方を、記事として公開しています。</p>
          </FadeUp>
          <FadeUp>
            <Link
              href={`${getCategoryPath(featured.category)}/${featured.post.slug}`}
              className="home-card group block border border-sequoia-black/8 bg-off-white p-6 transition-colors hover:border-brand-green/25 md:p-8"
            >
              <p className="home-label mb-3 text-brand-green">
                {getCategoryName(featured.category)} · {formatDate(featured.post.date)}
              </p>
              <h3 className="home-h3 mb-4 group-hover:text-brand-green">{featured.post.title}</h3>
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
                {featured.post.description || featured.post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green">
                記事を読む
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </FadeUp>
          <div className="mt-6">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:underline">
              AI活用の知見一覧へ
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="home-section bg-white" aria-labelledby="insights-heading">
      <div className="home-container">
        <FadeUp className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="insights-heading" className="home-h2 mb-3">
              AI活用の知見
            </h2>
            <p className="home-body">現場で使えるAI活用の考え方を公開しています。</p>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:underline">
            一覧を見る
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </FadeUp>

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
      </div>
    </section>
  )
}
