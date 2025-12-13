'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: '-50px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <footer ref={footerRef} className="bg-deep-forest-green text-warm-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          style={{ perspective: 1000 }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Amber</h3>
            <p className="text-stone-gray text-sm">
              暮らしを支える人に最新のテクノロジーを提供する。
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">サービス</h4>
            <ul className="space-y-2 text-sm text-stone-gray">
              <li>
                <motion.div whileHover={{ x: 5, rotateY: 5 }} style={{ perspective: 1000 }}>
                  <Link href="#ai-consulting" className="hover:text-warm-cream transition-colors block">
                    AI顧問サービス
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5, rotateY: 5 }} style={{ perspective: 1000 }}>
                  <Link href="#vertical-saas" className="hover:text-warm-cream transition-colors block">
                    Vertical SaaS
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">会社情報</h4>
            <ul className="space-y-2 text-sm text-stone-gray">
              <li>
                <motion.div whileHover={{ x: 5, rotateY: 5 }} style={{ perspective: 1000 }}>
                  <Link href="#about" className="hover:text-warm-cream transition-colors block">
                    会社について
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5, rotateY: 5 }} style={{ perspective: 1000 }}>
                  <Link href="#contact" className="hover:text-warm-cream transition-colors block">
                    お問い合わせ
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-stone-gray/20 pt-8 text-center text-sm text-stone-gray"
        >
          <p>© 2024 株式会社Amber. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
