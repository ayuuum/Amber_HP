'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import type { BlogPost } from '@/lib/markdown'

// クライアントコンポーネントで使用するためのヘルパー関数
function getCategoryName(category: 'consulting' | 'saas'): string {
  const names = {
    consulting: 'AI導入支援',
    saas: 'ホームサービス向け業務システム',
  }
  return names[category]
}

function getCategoryPath(category: 'consulting' | 'saas'): string {
  return `/service/${category}/blog`
}

type BlogSectionProps = {
  latestPosts: {
    consulting?: BlogPost
    saas?: BlogPost
  }
}

export default function BlogSection({ latestPosts }: BlogSectionProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const categories: Array<'consulting' | 'saas'> = ['consulting', 'saas']
  const posts = categories.map(cat => ({
    category: cat,
    post: latestPosts[cat],
  })).filter(item => item.post)

  if (posts.length === 0) {
    return null
  }

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-24 px-6 bg-sequoia-green/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-6">最新記事</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {posts.map(({ category, post }, index) => {
            if (!post) return null

            return (
              <motion.div
                key={category}
                variants={cardVariants}
                whileHover={{
                  scale: 1.01,
                  y: -4,
                  transition: { duration: 0.25 }
                }}
                className="surface-card interactive-card group h-full bg-sequoia-white p-6 flex flex-col"
              >
                <div className="mb-4">
                  <span className="text-xs text-sequoia-black font-semibold uppercase tracking-wide">
                    {getCategoryName(category)}
                  </span>
                </div>
                <Link
                  href={`${getCategoryPath(category)}/${post.slug}`}
                  className="block flex-grow"
                >
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold text-sequoia-black transition-colors duration-200 group-hover:text-sequoia-green">
                    {post.title}
                  </h3>
                  <p className="text-sequoia-black text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt || post.description}
                  </p>
                </Link>
                <div className="mt-auto">
                  <div className="mb-4">
                    <span className="text-xs text-sequoia-black/90">
                      {new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {post.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.keywords.slice(0, 3).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-sequoia-green/10 text-sequoia-black px-2 py-1 rounded-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={getCategoryPath(category)}
                    className="text-link text-sm"
                  >
                    記事一覧
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
