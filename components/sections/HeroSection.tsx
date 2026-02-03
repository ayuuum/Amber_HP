'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GenerativeMountainScene } from '../ui/mountain-scene'

export default function HeroSection() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ['最新の', '現場で役立つ', '導入しやすい', '成果につながる', '時代が求める'],
    []
  )

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1))
    }, 2500)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

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
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-deep-forest-green mb-8 md:mb-10"
        >
          <span className="block mb-4 md:mb-6 text-2xl md:text-4xl lg:text-5xl font-medium opacity-80 font-sans">暮らしを支える人に、</span>
          <span className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4">
            <span className="relative inline-flex items-center justify-center h-[1.2em] md:h-[1.4em] min-w-[3.5em] md:min-w-[6.5em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleNumber}
                  className="whitespace-nowrap"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {titles[titleNumber]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="whitespace-nowrap">テクノロジーを。</span>
          </span>
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
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-deep-forest-green text-white px-8 py-4 rounded-sm hover:bg-deep-forest-green/90 transition-colors inline-flex items-center gap-2 font-semibold shadow-lg relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                initial={{ x: '-150%' }}
                whileHover={{ x: '150%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                サービスを見る
                <span>→</span>
              </span>
            </motion.div>
          </Link>
          <Link href="#contact">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-deep-forest-green text-deep-forest-green px-8 py-4 rounded-sm hover:bg-deep-forest-green hover:text-white transition-colors inline-flex items-center gap-2 font-semibold cursor-pointer"
            >
              無料で相談する
            </motion.div>
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
