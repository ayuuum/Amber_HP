'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import type { BlogPost } from '@/lib/markdown'

// クライアントコンポーネントで使用するためのヘルパー関数
function getCategoryName(category: 'consulting' | 'training' | 'saas'): string {
  const names = {
    consulting: 'AI導入支援',
    training: '法人向け生成AI研修',
    saas: 'ホームサービス向け業務システム',
  }
  return names[category]
}

function getCategoryPath(category: 'consulting' | 'training' | 'saas'): string {
  return `/service/${category}/blog`
}

type BlogPreviewSectionProps = {
  posts: BlogPost[]
  category: 'consulting' | 'training' | 'saas'
}

export default function BlogPreviewSection({ posts, category }: BlogPreviewSectionProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  if (posts.length === 0) {
    return null
  }

  const displayPosts = posts.slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-white/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            関連記事
          </h2>
          <p className="text-xl text-deep-forest-green max-w-3xl mx-auto leading-relaxed">
            {getCategoryName(category)}に関する記事を発信しています。<br />
            実務に役立つ知見をお届けします。
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -6,
                transition: { duration: 0.25 }
              }}
              className="bg-white p-6 rounded-sm border border-deep-forest-green shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
            >
              <div className="mb-4">
                <span className="text-xs text-deep-forest-green font-semibold">
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
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
                  href={`${getCategoryPath(category)}/${post.slug}`}
                  className="inline-block text-deep-forest-green hover:text-deep-forest-green transition-colors text-sm font-semibold"
                >
                  続きを読む →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href={getCategoryPath(category)}
            className="inline-block bg-deep-forest-green text-white px-8 py-4 rounded-sm hover:bg-deep-forest-green transition-colors font-semibold"
          >
            すべての記事を見る
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
