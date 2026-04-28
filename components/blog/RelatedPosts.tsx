import Link from 'next/link'
import { getCategoryName, getCategoryPath } from '@/lib/markdown'
import type { BlogPost } from '@/lib/markdown'

type Props = {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 border-t border-sequoia-black/10 pt-12 md:mt-20 md:pt-16">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-sequoia-black md:text-3xl">
        関連記事
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`${getCategoryPath(post.category)}/${post.slug}`}
            className="group flex h-full flex-col rounded-sm border border-sequoia-black/10 bg-white p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-sequoia-green/30 hover:shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-sequoia-green">
                {getCategoryName(post.category)}
              </span>
              <span className="text-xs text-sequoia-black/60">
                {new Date(post.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <h3 className="mb-3 text-base font-bold leading-snug text-sequoia-black line-clamp-2 group-hover:text-sequoia-green md:text-lg">
              {post.title}
            </h3>
            <p className="text-sm leading-relaxed text-sequoia-black/75 line-clamp-3">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
