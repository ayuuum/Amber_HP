'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Users, TrendingUp } from 'lucide-react'
import { CountUp } from '@/components/ui/count-up'

const highlights = [
  {
    icon: Building2,
    number: '70+',
    label: '導入店舗',
  },
  {
    icon: Users,
    number: '500+',
    label: '支援実績',
  },
  {
    icon: TrendingUp,
    number: '95%',
    label: '継続率',
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
    <section
      ref={sectionRef}
      className="py-16 px-6 bg-white/10"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-sequoia-black/80 uppercase tracking-wide font-semibold mb-4">
            導入実績
          </p>
          <h3 className="section-heading text-2xl md:text-3xl">
            多くの企業様にご利用いただいています
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
                className="surface-card interactive-card flex flex-col items-center justify-center p-8"
              >
                <Icon className="mb-4 w-10 h-10 text-sequoia-black" aria-hidden="true" />
                <span className="text-4xl md:text-5xl font-bold text-sequoia-black mb-2 block">
                  <CountUp
                    to={parseInt(item.number.replace(/[^0-9]/g, ''))}
                    suffix={item.number.replace(/[0-9]/g, '')}
                  />
                </span>
                <span className="text-sequoia-black/90 font-medium">
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
