'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'



import Link from 'next/link'

export default function AIConsultingSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="ai-consulting"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ perspective: 1000 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -50, rotateY: -15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            className="relative h-64 lg:h-96 rounded-sm overflow-hidden shadow-xl order-2 lg:order-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop"
              alt="業務改善と効率化"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
              AI顧問サービス
            </h2>
            <p className="text-xl text-espresso-brown leading-relaxed mb-8">
              伴走型AI導入支援・業務改善・自動化サービス
            </p>
            <Link href="/service/consulting">
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
      </div>
    </section>
  )
}
