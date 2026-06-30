'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { BlogPost, BlogCategory } from '@/lib/markdown'
import { staggerContainerRelaxed, MOTION_BASE, MOTION_EASE } from '@/lib/motion-safe'

const CATEGORY_PATHS: Record<BlogCategory, string> = {
  development: '/service/development/blog',
  training: '/service/ai-training/blog',
}

function getCategoryPath(category: BlogCategory): string {
  return CATEGORY_PATHS[category]
}

type BlogPreviewSectionProps = {
  posts: BlogPost[]
  category?: BlogCategory
  categories?: BlogCategory[]
}

function plainExcerpt(text: string): string {
  return text
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\n+/g, ' ')
    .trim()
}

export default function BlogPreviewSection({ posts, category, categories }: BlogPreviewSectionProps) {
  if (posts.length === 0) {
    return null
  }

  const displayPosts = posts.slice(0, 3)

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_BASE,
        ease: MOTION_EASE,
      },
    },
  }

  const listHref = categories && categories.length > 1 ? '/blog' : category ? getCategoryPath(category) : '/blog'

  return (
    <section className="section-pad relative overflow-hidden bg-color-bg-subtle">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: MOTION_BASE, ease: MOTION_EASE }}
          className="section-header mb-0 text-center"
        >
          <h2 className="section-heading mb-6">関連記事</h2>
        </motion.div>

        <motion.div
          variants={staggerContainerRelaxed}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {displayPosts.map((post) => (
            <motion.div
              key={`${post.category}-${post.slug}`}
              variants={cardVariants}
              className="surface-card interactive-card group flex h-full flex-col p-6"
            >
              <div className="mb-4">
                <span className="text-caption font-semibold">
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <Link href={`${getCategoryPath(post.category)}/${post.slug}`} className="block flex-grow">
                <h3 className="heading-h3 mb-3 line-clamp-2 text-xl transition-colors duration-brand group-hover:text-sequoia-green">
                  {post.title}
                </h3>
                <p className="text-body mb-4 line-clamp-3 text-sequoia-black/80">
                  {plainExcerpt(post.excerpt || post.description)}
                </p>
              </Link>
              <div className="mt-auto">
                {post.keywords.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.keywords.slice(0, 3).map((keyword, idx) => (
                      <span key={idx} className="text-caption rounded-sm bg-sequoia-black/10 px-2 py-1">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`${getCategoryPath(post.category)}/${post.slug}`}
                  className="text-link text-sm"
                >
                  続きを読む
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: MOTION_BASE, delay: 0.08, ease: MOTION_EASE }}
          className="mt-12 text-center"
        >
          <Link href={listHref} className="btn-primary">
            すべての記事を見る
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
