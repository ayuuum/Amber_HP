'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CountUp } from '@/components/ui/count-up'
import { staggerContainerRelaxed } from '@/lib/motion-safe'

const stats = [
  {
    number: '70',
    suffix: '+',
    unit: '店舗',
    label: '導入店舗数',
  },
  {
    number: '50',
    suffix: '%',
    unit: '削減',
    label: '業務時間削減率',
  },
  {
    number: '30',
    suffix: '%',
    unit: '向上',
    label: '平均売上向上率',
  },
  {
    number: '95',
    suffix: '%',
    unit: '満足',
    label: '顧客満足度',
  },
]

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function StatsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-green-dark px-6 py-28 text-white md:py-36"
    >
      {/* 背景：右上に薄くグリーンのグロー */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-sequoia-green opacity-[0.12] blur-[120px]"
      />
      {/* グリッド線テクスチャ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* 見出し */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-xl"
        >
          <p className="eyebrow-forest mb-4">実績</p>
          <h2 className="text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            数値で見る、<br />確かな変化。
          </h2>
        </motion.div>

        {/* 数値グリッド */}
        <motion.div
          variants={staggerContainerRelaxed}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-green-dark px-8 py-10 transition-colors duration-300 hover:bg-sequoia-green/20"
            >
              {/* 数値 */}
              <div className="mb-3 flex items-end gap-1 leading-none">
                <span className="text-5xl font-black tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
                  <CountUp
                    to={parseInt(stat.number)}
                    duration={2}
                    className="inline-block tabular-nums"
                  />
                </span>
                <span className="mb-1 text-2xl font-bold text-sequoia-green-accent md:text-3xl">
                  {stat.suffix}
                </span>
              </div>
              {/* ラベル */}
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
                {stat.unit}　{stat.label}
              </p>
              {/* ボトムライン（ホバーで伸びる） */}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-sequoia-green transition-[width] duration-500 group-hover:w-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
