import Link from 'next/link'
import { getAllPosts, getCategoryName, getCategoryPath } from '@/lib/markdown'
import type { BlogPost } from '@/lib/markdown'

function mergeLatestPosts(limit: number): { post: BlogPost; category: 'consulting' | 'saas' }[] {
  const consulting = getAllPosts('consulting')
  const saas = getAllPosts('saas')
  const merged = [
    ...consulting.map((post) => ({ post, category: 'consulting' as const })),
    ...saas.map((post) => ({ post, category: 'saas' as const })),
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

  return (
    <section
      className="border-t border-sequoia-black/10 bg-color-bg-subtle px-6 py-20 md:py-24"
      aria-labelledby="home-news-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow-light mb-3">ニュース・ブログ</p>
            <h2 id="home-news-heading" className="section-heading mb-4">
              ニュース・ブログ
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-sequoia-black/80 md:text-lg">
              実務に役立つ知見やお知らせを発信しています。
            </p>
          </div>
          <Link
            href="/blog"
            className="btn-secondary inline-flex min-w-[180px] items-center justify-center self-start md:self-auto"
          >
            すべての記事を見る
          </Link>
        </div>
        <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
          {items.map(({ post, category }) => (
            <li key={`${category}-${post.slug}`}>
              <Link
                href={`${getCategoryPath(category)}/${post.slug}`}
                className="group grid gap-3 py-6 transition-colors hover:bg-sequoia-black/[0.03] md:grid-cols-[180px_1fr] md:px-3"
              >
                <span className="flex flex-col gap-1 text-xs font-medium text-sequoia-black/55">
                  <span>{getCategoryName(category)}</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </span>
                <span className="flex min-w-0 flex-col gap-2">
                  <span className="line-clamp-2 text-lg font-bold text-sequoia-black transition-colors group-hover:text-sequoia-green">
                    {post.title}
                  </span>
                  <span className="line-clamp-1 text-sm leading-relaxed text-sequoia-black/70">
                    {post.excerpt || post.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
