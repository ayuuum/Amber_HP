'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GenerativeMountainScene } from '../ui/mountain-scene'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-40 md:pt-48 lg:pt-56 pb-20 md:pb-24 px-6 overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(31,51,38,0.25)_0,_rgba(31,51,38,0)_65%)] blur-3xl" />
      </div>
      <div className="absolute inset-0 z-0 opacity-20">
        <GenerativeMountainScene color="#FFFFFF" />
      </div>

      {/* テキストの視認性を上げるためのオーバーレイ */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-white/20 via-transparent to-white/30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-deep-forest-green mb-8 md:mb-10"
        >
          <span className="whitespace-nowrap">暮らしを支える人に、</span>
          <br />
          <span className="whitespace-nowrap">最新のテクノロジーを。</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg lg:text-xl text-deep-forest-green leading-relaxed max-w-2xl mx-auto mb-10"
        >
          AI顧問サービスとVertical SaaSで、現場の非効率をなくし、<br className="hidden md:block" />
          働く人の時間と収益を取り戻します。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="#about">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-deep-forest-green text-white px-8 py-4 rounded-sm hover:bg-deep-forest-green/90 transition-colors inline-flex items-center gap-2 font-semibold shadow-lg"
            >
              サービスを見る
              <span>→</span>
            </motion.button>
          </Link>
          <Link href="#contact">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-deep-forest-green text-deep-forest-green px-8 py-4 rounded-sm hover:bg-deep-forest-green hover:text-white transition-colors inline-flex items-center gap-2 font-semibold"
            >
              無料で相談する
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-transparent to-transparent pointer-events-none z-10"
      />
    </section>
  )
}
