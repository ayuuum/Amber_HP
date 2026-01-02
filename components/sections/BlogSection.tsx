'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import type { BlogPost } from '@/lib/markdown'

// クライアントコンポーネントで使用するためのヘルパー関数
function getCategoryName(category: 'consulting' | 'training' | 'saas'): string {
  const names = {
    consulting: 'AI顧問サービス',
    training: '法人向け生成AI研修',
    saas: 'ホームサービス向けVertical SaaS',
  }
  return names[category]
}

function getCategoryPath(category: 'consulting' | 'training' | 'saas'): string {
  return `/service/${category}/blog`
}

type BlogSectionProps = {
  latestPosts: {
    consulting?: BlogPost
    training?: BlogPost
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

  const categories: Array<'consulting' | 'training' | 'saas'> = ['consulting', 'training', 'saas']
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
      className="py-24 px-6 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            最新記事
          </h2>
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
                  scale: 1.02,
                  y: -6,
                  transition: { duration: 0.25 }
                }}
                className="bg-white p-6 rounded-sm border border-deep-forest-green shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
              >
                <div className="mb-4">
                  <span className="text-xs text-deep-forest-green font-semibold uppercase tracking-wide">
                    {getCategoryName(category)}
                  </span>
                </div>
                <Link
                  href={`${getCategoryPath(category)}/${post.slug}`}
                  className="block flex-grow"
                >
                  <h3 className="text-xl font-bold text-deep-forest-green mb-3 line-clamp-2 hover:text-deep-forest-green transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-deep-forest-green text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt || post.description}
                  </p>
                </Link>
                <div className="mt-auto">
                  <div className="mb-4">
                    <span className="text-xs text-deep-forest-green/70">
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
                          className="text-xs bg-white/30 text-deep-forest-green px-2 py-1 rounded-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={getCategoryPath(category)}
                    className="inline-block text-deep-forest-green hover:text-deep-forest-green transition-colors text-sm font-semibold"
                  >
                    すべての記事を見る →
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
