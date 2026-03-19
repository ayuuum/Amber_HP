'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'ai-consulting',
    title: 'AI導入支援',
    description: 'AI導入から定着まで、一緒に進めます。',
    href: '/service/consulting',
    features: ['業務改善・自動化', '社内研修', '伴走支援'],
  },
  {
    id: 'vertical-saas',
    title: 'ホームサービス向けSaaS',
    description: '予約・顧客・請求を一元化。（開発中）',
    href: '/service/saas',
    features: ['予約・顧客管理', 'リマインド', '請求・見積'],
    badge: '開発中',
  },
]

export default function ServiceSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
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

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

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
      id="services"
      ref={sectionRef}
      className="py-32 px-6 bg-sequoia-green/[0.04] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="section-heading mb-6">サービス</h2>
          <p className="section-subheading">導入支援とプロダクト提供の両面から、現場の業務改善を支えます。</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isMounted && isInView ? 'visible' : (isMounted ? 'visible' : 'hidden')}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="surface-card interactive-card overflow-hidden flex h-full flex-col group bg-[#F9F6F1]"
              >
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-serif font-bold text-sequoia-black mb-4 flex items-center gap-2">
                    {service.title}
                    {/* @ts-ignore */}
                    {service.badge && (
                      <span className="text-xs text-sequoia-black/60 font-sans font-normal">
                        {/* @ts-ignore */}
                        {service.badge}
                      </span>
                    )}
                  </h3>
                  <p className="text-sequoia-black/90 leading-relaxed mb-6 text-sm lg:text-base">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-sequoia-black/90">
                        <span className="w-1.5 h-1.5 bg-sequoia-black/50 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <Link href={service.href} className="btn-secondary w-full">
                    詳しく見る
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

