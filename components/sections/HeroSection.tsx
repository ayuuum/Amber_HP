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
          <span className="whitespace-nowrap">暮らしを支える人を</span>
          <br />
          <span className="whitespace-nowrap">テクノロジーで支える</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg lg:text-xl text-deep-forest-green leading-relaxed max-w-2xl mx-auto"
        >
          予約対応、見積作成、請求処理に1日3時間もかかっていませんか？
          AIで業務を自動化し、本来の仕事に集中できる環境を実現します。
        </motion.p>
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
