import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost, BlogCategory } from '@/lib/markdown'
import { getCategoryName, getCategoryPath } from '@/lib/markdown'

type Props = {
  post: BlogPost
  category: BlogCategory
  featured?: boolean
}

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function ArticleCard({ post, category, featured = false }: Props) {
  const href = `${getCategoryPath(category)}/${post.slug}`
  if (featured) {
    return (
      <Link href={href} className="home-card group block border border-sequoia-black/8 bg-off-white p-7 transition-colors hover:border-brand-green/25 md:p-10">
        <p className="home-label mb-3 text-brand-green">
          {getCategoryName(category)} · {formatDate(post.date)}
        </p>
        <h2 className="home-h3 mb-4 group-hover:text-brand-green">{post.title}</h2>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-secondary md:text-base">{post.excerpt || post.description}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green">
          記事を読む
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </Link>
    )
  }

  return (
    <Link href={href} className="home-card group flex h-full flex-col border border-sequoia-black/8 bg-white p-6 transition-colors hover:border-brand-green/25">
      <p className="home-label mb-3 text-brand-green">{getCategoryName(category)}</p>
      <time className="mb-3 text-xs text-secondary" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
      <h3 className="mb-3 text-lg font-medium leading-snug text-sequoia-black group-hover:text-brand-green">{post.title}</h3>
      <p className="mt-auto line-clamp-3 text-sm leading-relaxed text-secondary">{post.excerpt || post.description}</p>
    </Link>
  )
}
