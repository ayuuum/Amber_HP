'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GenerativeMountainScene } from '../ui/mountain-scene'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* 背景画像 */}
      {/* 背景 (Generator) */}
      <div className="absolute inset-0 z-0 opacity-50">
        <GenerativeMountainScene color="#F5EEDF" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-deep-forest-green mb-8 md:mb-12"
        >
          暮らしを支える人を<br />
          最新テクノロジーで支える</motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
          className="text-base md:text-lg lg:text-xl text-espresso-brown mb-12 md:mb-16 leading-relaxed"
        >
          清掃・設備・修理・施工など、現場型ビジネスの業務をAIで軽くします。<br />
          現場の非効率をなくし、働く人の時間と収益を取り戻します。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5, z: 20 }}
            whileTap={{ scale: 0.98 }}
            style={{ perspective: 1000 }}
          >
            <Link
              href="#contact"
              className="block bg-deep-forest-green text-warm-cream px-8 py-4 rounded-sm hover:bg-espresso-brown transition-colors text-center shadow-lg font-bold"
            >
              無料で相談する<span className="text-sm font-normal block opacity-90">（30分・営業なし）</span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotateY: -5, z: 20 }}
            whileTap={{ scale: 0.98 }}
            style={{ perspective: 1000 }}
          >
            <Link
              href="#ai-consulting"
              className="block border-2 border-deep-forest-green text-deep-forest-green px-8 py-4 rounded-sm hover:bg-deep-forest-green hover:text-warm-cream transition-colors text-center shadow-lg font-bold"
            >
              自社がAI導入できるか診断する
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 装飾的な要素 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-gray/20 to-transparent pointer-events-none z-10"
      />
    </section>
  )
}
