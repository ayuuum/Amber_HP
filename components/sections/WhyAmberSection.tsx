'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HeartHandshake, TrendingUp, ShieldCheck } from 'lucide-react'

const strengths = [
  {
    title: '現場視点',
    description: '現場の経験をもとに、使える解決策を提案します。',
    icon: HeartHandshake,
  },
  {
    title: '成果まで伴走',
    description: '導入で終わりにせず、成果が出るまで伴走します。',
    icon: TrendingUp,
  },
  {
    title: '段階的導入',
    description: '一気に変えず、ペースを守ります。',
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
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-6">選ばれる理由</h2>
          <p className="section-subheading">現場を理解したうえで、無理のない導入と定着まで伴走します。</p>
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
                  scale: 1.01,
                  y: -4,
                  transition: { duration: 0.25 }
                }}
                className="surface-card interactive-card bg-sequoia-white p-8"
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sequoia-green/10 text-sequoia-green">
                  <Icon className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-sequoia-black mb-4">
                  {strength.title}
                </h3>
                <p className="text-sequoia-black/90 leading-relaxed">
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
