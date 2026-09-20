import Link from 'next/link'
import { getCategoryName, getCategoryPath } from '@/lib/markdown'
import type { BlogPost } from '@/lib/markdown'
import { excerptPlainText } from '@/lib/plain-text'
import BlogCoverImage from '@/components/blog/BlogCoverImage'

type Props = {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 border-t border-sequoia-black/10 pt-12 md:mt-20 md:pt-16">
      <h2 className="mb-8 text-xl font-medium tracking-tight text-sequoia-black md:text-2xl">関連記事</h2>
      <ul className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`${getCategoryPath(post.category)}/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden border border-sequoia-black/10 bg-white transition-colors hover:border-brand-green/30"
            >
              {post.cover ? (
                <BlogCoverImage
                  src={post.cover}
                  alt={post.coverAlt || post.title}
                  className="aspect-[16/10] w-full"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              ) : (
                <div className="aspect-[16/10] w-full bg-off-white" aria-hidden />
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sequoia-black/55">
                  <span className="font-medium tracking-[0.06em] text-brand-green">
                    {getCategoryName(post.category)}
                  </span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <h3 className="mb-2 text-base font-medium leading-snug text-sequoia-black transition-colors group-hover:text-brand-green md:text-lg">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-secondary">
                  {excerptPlainText(post.description || post.excerpt || '')}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
