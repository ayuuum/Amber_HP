import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost, BlogCategory } from '@/lib/markdown'
import { getCategoryName, getReadingTimeMinutes } from '@/lib/markdown'

type Props = {
  post: BlogPost
  category: BlogCategory
}

function formatJaDate(date: string) {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogArticleHeader({ post, category }: Props) {
  const readingMinutes = getReadingTimeMinutes(post.content)
  const coverAlt = post.coverAlt || post.title
  const modified = post.dateModified && post.dateModified !== post.date ? post.dateModified : null

  return (
    <header className="mb-12 border-b border-sequoia-black/10 pb-10">
      {post.cover ? (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden bg-off-white md:mb-10 md:aspect-[2/1]">
          <Image
            src={post.cover}
            alt={coverAlt}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-sequoia-black/55">
        <span className="font-medium tracking-[0.06em] text-brand-green">{getCategoryName(category)}</span>
        <span aria-hidden className="text-sequoia-black/25">
          /
        </span>
        <time dateTime={post.date}>{formatJaDate(post.date)}</time>
        {modified ? (
          <>
            <span aria-hidden className="text-sequoia-black/25">
              /
            </span>
            <span>
              更新 <time dateTime={modified}>{formatJaDate(modified)}</time>
            </span>
          </>
        ) : null}
        <span aria-hidden className="text-sequoia-black/25">
          /
        </span>
        <span>約{readingMinutes}分</span>
      </div>
      <h1 className="home-h2 mb-5 text-[1.85rem] leading-tight md:text-[2.5rem]">{post.title}</h1>
      {post.description ? (
        <p className="mb-6 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">{post.description}</p>
      ) : null}
      {post.keywords.length > 0 ? (
        <ul className="mb-6 flex flex-wrap gap-2">
          {post.keywords.slice(0, 6).map((keyword) => (
            <li
              key={keyword}
              className="rounded-full border border-sequoia-black/10 bg-off-white px-3 py-1 text-xs tracking-wide text-sequoia-black/65"
            >
              {keyword}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="text-sm text-secondary">
        <Link
          href="/company#representative"
          className="font-medium text-sequoia-black underline-offset-4 hover:text-brand-green hover:underline"
        >
          {post.author}
        </Link>
        <span className="text-sequoia-black/40"> · </span>
        <span>{post.authorTitle}</span>
      </p>
    </header>
  )
}

export function BlogBackLink() {
  return (
    <div className="mb-10">
      <Link href="/blog" className="text-sm text-brand-green hover:underline">
        ← Back to Insights
      </Link>
    </div>
  )
}
