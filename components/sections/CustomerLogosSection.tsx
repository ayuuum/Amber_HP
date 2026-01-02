'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

// 顧客ロゴのプレースホルダー（実際のロゴに置き換えてください）
const customerLogos = [
  {
    name: '顧客企業A',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80&auto=format&fit=crop',
  },
  {
    name: '顧客企業B',
    logo: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=200&q=80&auto=format&fit=crop',
  },
  {
    name: '顧客企業C',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&q=80&auto=format&fit=crop',
  },
  {
    name: '顧客企業D',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&q=80&auto=format&fit=crop',
  },
  {
    name: '顧客企業E',
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&q=80&auto=format&fit=crop',
  },
  {
    name: '顧客企業F',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80&auto=format&fit=crop',
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
        staggerChildren: 0.1,
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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-deep-forest-green/70 uppercase tracking-wide font-semibold mb-4">
            導入実績
          </p>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-deep-forest-green">
            ご利用いただいている企業様
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {customerLogos.map((customer, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                y: -2,
                transition: { duration: 0.2 }
              }}
              className="flex items-center justify-center p-4 bg-white rounded-sm border border-deep-forest-green/30 hover:border-deep-forest-green hover:shadow-md transition-all"
            >
              <div className="relative w-full h-16 grayscale hover:grayscale-0 transition-all">
                <Image
                  src={customer.logo}
                  alt={customer.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

