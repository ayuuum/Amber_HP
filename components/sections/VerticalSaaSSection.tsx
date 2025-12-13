'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'



import Link from 'next/link'

export default function VerticalSaaSSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="vertical-saas"
      ref={sectionRef}
      className="py-24 px-6 bg-stone-gray/30"
      style={{ perspective: 1000 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            ホームサービス業のための<br />AI業務OS
          </h2>
          <p className="text-xl text-espresso-brown max-w-3xl mx-auto leading-relaxed mb-8">
            ホームサービス事業者の業務を包括的にサポートします。
          </p>
          <Link href="/service/saas">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-deep-forest-green text-warm-cream px-8 py-3 rounded-sm hover:bg-espresso-brown transition-colors inline-flex items-center gap-2"
            >
              詳しく見る
              <motion.span>
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
