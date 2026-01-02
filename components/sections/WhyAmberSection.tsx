'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const strengths = [
  {
    title: '机上の空論ではない',
    description: '実際に現場で9ヶ月間働いた経験から、現場の課題を深く理解しています。「現場で使えないAI」は提案しません。',
  },
  {
    title: '短期で終わらせない',
    description: 'VC・コンサル背景を持つメンバーが、長期的な事業成長を支援。単なるツール導入ではなく、経営にインパクトを出します。',
  },
  {
    title: '無理な導入はしない',
    description: 'AI顧問サービスから始まり、必要に応じてSaaSへと移行。いきなり高額なツール導入を迫ることはありません。',
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
    hidden: { opacity: 0, y: 32, scale: 0.98, rotateX: 0, rotateY: 0, rotateZ: 0 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const images = [
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop',
  ]

  return (
    <section
      id="why"
      ref={sectionRef}
      className="py-24 px-6 bg-white/20 relative overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-full opacity-5 hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop"
          alt="装飾背景"
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

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
            AI × 現場理解 × プロダクト<br />
            この3つの要素が、Amberの強みです。<br />
            <span className="text-base">実際に現場で働いた経験と、VC・コンサル背景を持つメンバーが、<br />
            長期的な事業成長を支援します。</span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -6,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                transition: { duration: 0.25 }
              }}
              style={{ transformStyle: 'flat' }}
              className="bg-white p-8 rounded-sm border border-deep-forest-green shadow-lg overflow-hidden"
            >
              <div className="relative h-48 mb-6 rounded-sm overflow-hidden">
                <Image
                  src={images[index]}
                  alt={strength.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-deep-forest-green mb-4">
                {strength.title}
              </h3>
              <p className="text-deep-forest-green leading-relaxed">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
