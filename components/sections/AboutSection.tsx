'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-40 md:pt-48 lg:pt-56 pb-32 px-6 bg-white/30 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-deep-forest-green mb-12"
        >
          About Amber
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-10 text-base md:text-lg leading-relaxed text-deep-forest-green"
        >
          <motion.p variants={itemVariants} className="text-lead font-bold text-2xl md:text-3xl mb-10">
            「暮らしを支える人に、テクノロジーを。」
          </motion.p>

          {/* Amberについて */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-left border-l-4 border-deep-forest-green/30 pl-6 pr-2">
            <h3 className="text-sm font-bold text-deep-forest-green uppercase tracking-wider mb-3">Amberについて</h3>
            <p className="mb-2">
              私たちは、現場の非効率をなくし、働く人の時間と収益を取り戻すことを目指しています。
            </p>
            <p>
              Amberは、AI導入支援とホームサービス事業者向け業務システムを通じて、その実現を使命としています。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
