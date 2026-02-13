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
          私たちについて
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

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto">
            私たちは、現場の非効率をなくし、働く人の時間と収益を取り戻すことを目指しています。
            実際に現場の最前線に入り込んだ経験から、現場の課題を深く理解しています。
          </motion.p>

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto">
            日々の業務に追われ、非効率な作業に時間を奪われ、本来注力すべきことに集中できない。そんな現場の課題を、テクノロジーの力で解決します。
          </motion.p>

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto">
            Amberは、AI顧問サービスとホームサービス事業者向けVertical SaaSを通じて、
            現場の非効率をなくし、働く人の時間と収益を取り戻すことを使命としています。
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8"
          >
            <div className="bg-white/60 p-8 rounded-sm border border-deep-forest-green/20 max-w-3xl mx-auto">
              <p className="text-lg">
                テクノロジーを主張しすぎず、現場の声に耳を傾け、丁寧に伴走する。
                <br />
                それが私たちのアプローチです。無理な営業は一切行いません。
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
