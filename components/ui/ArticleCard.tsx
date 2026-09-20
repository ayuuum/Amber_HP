import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogPost, BlogCategory } from '@/lib/markdown'
import { getCategoryName, getCategoryPath } from '@/lib/markdown'
import { excerptPlainText } from '@/lib/plain-text'
import BlogCoverImage from '@/components/blog/BlogCoverImage'

type Props = {
  post: BlogPost
  category: BlogCategory
  featured?: boolean
}

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function formatDateLong(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** 一覧用要約。description を優先し、タイトル重複を避ける。 */
function listSummary(post: BlogPost): string {
  if (post.description?.trim()) {
    return excerptPlainText(post.description)
  }
  const raw = excerptPlainText(post.excerpt || post.content || '')
  if (!raw) return ''
  const title = post.title.trim()
  if (raw.startsWith(title)) {
    return raw.slice(title.length).replace(/^[。．\s]+/, '').trim()
  }
  return raw
}

export default function ArticleCard({ post, category, featured = false }: Props) {
  const href = `${getCategoryPath(category)}/${post.slug}`
  const summary = listSummary(post)
  const coverAlt = post.coverAlt || post.title

  if (featured) {
    return (
      <Link
        href={href}
        className="group block overflow-hidden border-y border-sequoia-black/10 bg-white transition-colors"
      >
        <div className="grid md:grid-cols-2">
          {post.cover ? (
            <BlogCoverImage
              src={post.cover}
              alt={coverAlt}
              priority
              className="aspect-[16/11] md:aspect-auto md:min-h-[320px] lg:min-h-[380px]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="aspect-[16/11] bg-off-white md:min-h-[320px] lg:min-h-[380px]" aria-hidden />
          )}
          <div className="flex flex-col justify-center px-5 py-10 md:px-10 md:py-14 lg:px-12">
            <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-sm font-medium tracking-[0.08em] text-brand-green">
                {getCategoryName(category)}
              </span>
              <time
                dateTime={post.date}
                className="text-sm tabular-nums tracking-wide text-sequoia-black/45"
              >
                {formatDate(post.date)}
              </time>
            </div>
            <h2 className="home-h2 mb-4 text-[1.5rem] transition-colors group-hover:text-brand-green md:text-[1.85rem] lg:text-[2.05rem]">
              {post.title}
            </h2>
            {summary ? (
              <p className="mb-8 max-w-xl text-base leading-relaxed text-secondary">{summary}</p>
            ) : null}
            <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-green">
              記事を読む
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        'group grid gap-4 bg-white px-5 py-6 transition-colors md:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] md:items-center md:gap-8 md:px-8 md:py-7'
      )}
    >
      {post.cover ? (
        <BlogCoverImage
          src={post.cover}
          alt={coverAlt}
          className="aspect-[16/10] w-full"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      ) : (
        <div className="aspect-[16/10] w-full bg-off-white" aria-hidden />
      )}
      <span className="min-w-0">
        <span className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sequoia-black/55">
          <span className="font-medium tracking-[0.06em] text-brand-green">{getCategoryName(category)}</span>
          <time dateTime={post.date}>{formatDateLong(post.date)}</time>
        </span>
        <span className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-lg font-medium leading-snug text-sequoia-black transition-colors group-hover:text-brand-green md:text-xl">
            {post.title}
          </h3>
          <ArrowRight
            className="mt-1 h-4 w-4 shrink-0 text-brand-green/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand-green"
            aria-hidden
          />
        </span>
        {summary ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-secondary md:text-base">{summary}</p>
        ) : null}
      </span>
    </Link>
  )
}
