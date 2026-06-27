import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, getCategoryName, getCategoryPath } from '@/lib/markdown'
import type { BlogPost, BlogCategory } from '@/lib/markdown'
import { excerptPlainText } from '@/lib/plain-text'

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

  return (
    <section
      className="section-pad border-t border-sequoia-black/10 bg-color-bg"
      aria-labelledby="home-news-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-header mb-12 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="home-news-heading" className="section-heading">
              最新記事
            </h2>
            <p className="section-subheading mt-3 !mx-0 !max-w-none text-left">
              知見とアップデートを公開しています。
            </p>
          </div>
          <Link href="/blog" className="text-link self-start md:self-auto">
            記事一覧を見る
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-4 md:gap-5">
          {items.map(({ post, category }) => (
            <li key={`${category}-${post.slug}`}>
              <Link
                href={`${getCategoryPath(category)}/${post.slug}`}
                className="group surface-card interactive-card grid gap-4 px-5 py-5 md:grid-cols-[180px_1fr] md:px-6"
              >
                <span className="text-caption flex flex-col gap-1 font-medium">
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
                  <span className="heading-h3 line-clamp-2 transition-colors group-hover:text-sequoia-green">
                    {post.title}
                  </span>
                  <span className="text-body line-clamp-1 text-sequoia-black/75">
                    {excerptPlainText(post.excerpt || post.description || '')}
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
