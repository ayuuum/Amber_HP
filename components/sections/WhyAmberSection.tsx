'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HeartHandshake, TrendingUp, ShieldCheck } from 'lucide-react'

const strengths = [
  {
    title: '徹底した「現場視点」',
    description: '現場の課題を深く理解し、実務で役立つ解決策を提案します。',
    icon: HeartHandshake,
  },
  {
    title: '長期的な事業成長への伴走',
    description: 'VC・コンサル背景を持つメンバーが、売上や利益につながる支援を行います。',
    icon: TrendingUp,
  },
  {
    title: 'リスクを抑えた段階的導入',
    description: 'AI導入支援から始め、使い慣れてから業務システムへ。無理のないペースでサポートします。',
    icon: ShieldCheck,
  },
]

export default function WhyAmberSection() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="why-amber"
      ref={sectionRef}
      className="py-24 px-6 bg-white/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            Why Amber
          </h2>
          <p className="text-xl text-deep-forest-green max-w-3xl mx-auto leading-relaxed">
            AI × 現場理解 × プロダクト。長期的に支援します。
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {strengths.map((strength, index) => {
            const Icon = strength.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  y: -6,
                  transition: { duration: 0.25 }
                }}
                className="bg-white p-8 rounded-sm border border-deep-forest-green/20 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-deep-forest-green/5 text-deep-forest-green">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-deep-forest-green mb-4">
                  {strength.title}
                </h3>
                <p className="text-deep-forest-green/80 leading-relaxed">
                  {strength.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
