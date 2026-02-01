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
      className="pt-32 md:pt-40 lg:pt-48 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-64 lg:h-96 rounded-sm overflow-hidden shadow-xl order-2 lg:order-1"
          >
            <Image
              src="/images/consulting-meeting.png"
              alt="AI顧問サービス - ビジネスコンサルティング"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
              AI顧問サービス
            </h2>
            <p className="text-xl text-deep-forest-green leading-relaxed mb-4">
              伴走型AI導入支援・業務改善・自動化サービス
            </p>
            <p className="text-base text-deep-forest-green leading-relaxed mb-8">
              現場で9ヶ月間働いた経験から、現場の課題を深く理解しています。<br />
              「現場で使えないAI」は提案しません。平均<span className="font-semibold text-deep-forest-green">3ヶ月で業務効率50%向上</span>を実現します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/service/consulting">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-deep-forest-green text-white px-8 py-3 rounded-sm hover:bg-deep-forest-green transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  詳しく見る
                  <motion.span>
                    →
                  </motion.span>
                </motion.button>
              </Link>
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-deep-forest-green text-deep-forest-green px-8 py-3 rounded-sm hover:bg-deep-forest-green hover:text-white transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  無料で相談する
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
