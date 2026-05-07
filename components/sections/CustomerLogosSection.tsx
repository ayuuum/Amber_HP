'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Users, TrendingUp } from 'lucide-react'
import { CountUp } from '@/components/ui/count-up'

const highlights = [
  {
    icon: Building2,
    number: '58',
    label: 'Pine運用パートナー店舗',
  },
  {
    icon: Users,
    number: '2',
    label: 'AI Solution / Product の事業軸',
  },
  {
    icon: TrendingUp,
    number: '4',
    label: '相談できる支援メニュー',
  },
]

export default function CustomerLogosSection() {
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
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section ref={sectionRef} className="border-t border-sequoia-black/10 bg-color-bg px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="eyebrow-light mb-4">動いている証拠</p>
          <h3 className="section-heading text-2xl md:text-3xl">
            個社支援とプロダクト運用
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.01,
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="interactive-card flex flex-col items-center justify-center rounded-sm border border-sequoia-black/12 bg-white p-8 shadow-[0_1px_0_rgba(27,25,22,0.04)]"
              >
                <Icon className="mb-3 h-8 w-8 text-sequoia-green" aria-hidden="true" />
                <span className="mb-2 block text-4xl font-bold tabular-nums text-sequoia-black md:text-5xl">
                  <CountUp
                    to={parseInt(item.number.replace(/[^0-9]/g, ''))}
                    suffix={item.number.replace(/[0-9]/g, '')}
                  />
                </span>
                <span className="text-center font-medium text-sequoia-black/75">
                  {item.label}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
