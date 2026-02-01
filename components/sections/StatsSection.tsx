'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  {
    number: '70',
    suffix: '店舗',
    label: '導入店舗数',
    description: 'ホームサービス事業者様にご利用いただいています',
  },
  {
    number: '50',
    suffix: '%',
    label: '業務時間削減',
    description: '平均的な業務時間削減率',
  },
  {
    number: '30',
    suffix: '%',
    label: '売上向上',
    description: '業務効率化による売上向上率',
  },
  {
    number: '95',
    suffix: '%',
    label: '顧客満足度',
    description: 'サービス満足度調査結果',
  },
]

export default function StatsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-deep-forest-green text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            数値で見る導入成果
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            AI導入によって実現した、確かな変化。
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -6,
                transition: { duration: 0.25 }
              }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-sm border border-deep-forest-green/20 text-center"
            >
              <div className="mb-4">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white block">
                  {stat.number}
                  <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">{stat.label}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
