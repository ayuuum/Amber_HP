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
      className="py-24 px-6 bg-white/30"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            ホームサービス業のための<br />AIエージェント
          </h2>
          <p className="text-xl text-deep-forest-green max-w-3xl mx-auto leading-relaxed mb-4">
            予約管理、顧客管理、請求処理を一元化。ホームサービス事業者の業務を包括的にサポートします。
          </p>
          <p className="text-base text-deep-forest-green max-w-3xl mx-auto leading-relaxed mb-8">
            清掃・不用品回収・リフォーム・修理・害虫駆除など、個人のお客様から直接依頼を受ける事業者様向け。<br />
            <span className="font-semibold text-deep-forest-green">予約対応時間を80%削減</span>し、<span className="font-semibold text-deep-forest-green">顧客満足度を向上</span>させた実績があります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/service/saas">
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

          {/* SaaS Dashboard Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative w-full max-w-4xl mx-auto mt-12 rounded-sm overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/saas-dashboard.png"
              alt="ホームサービス事業者向けSaaSダッシュボード"
              width={1200}
              height={750}
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
