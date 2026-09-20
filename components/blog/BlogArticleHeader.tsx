import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost, BlogCategory } from '@/lib/markdown'
import { getCategoryName, getReadingTimeMinutes } from '@/lib/markdown'

type Props = {
  post: BlogPost
  category: BlogCategory
}

export default function BlogArticleHeader({ post, category }: Props) {
  const readingMinutes = getReadingTimeMinutes(post.content)
  const coverAlt = post.coverAlt || post.title

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
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span aria-hidden className="text-sequoia-black/25">
          /
        </span>
        <span>約{readingMinutes}分</span>
      </div>
      <h1 className="home-h2 mb-5 text-[1.85rem] leading-tight md:text-[2.5rem]">{post.title}</h1>
      {post.description ? (
        <p className="max-w-2xl text-base leading-relaxed text-secondary md:text-lg">{post.description}</p>
      ) : null}
    </header>
  )
}

export function BlogBackLink() {
  return (
    <div className="mb-10">
      <Link href="/blog" className="text-sm text-brand-green hover:underline">
        ← AI活用の知見に戻る
      </Link>
    </div>
  )
}
