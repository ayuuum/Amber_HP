'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { staggerContainerLoose } from '@/lib/motion-safe'

type ServiceCard = {
  id: string
  title: string
  description: string
  href: string
  features: string[]
  external?: boolean
}

const services: ServiceCard[] = [
  {
    id: 'ai-consulting',
    title: 'AI・Webシステム開発',
    description: '業務システム、社内ツール、生成AI連携まで、現場の運用に合わせて設計・開発します。',
    href: '/service/development',
    features: ['業務整理・要件定義', 'Webシステム開発', '生成AI連携・自動化'],
  },
  {
    id: 'ai-training',
    title: '生成AI研修',
    description: 'OFF-JT形式で現場で使える生成AIスキルを体系的に習得。',
    href: '/service/ai-training',
    features: ['全12回・計24時間', '座学＋実習', '助成金対象（条件あり）'],
  },
  {
    id: 'vertical-saas',
    title: 'Pine（AIプロダクト）',
    description: '出張訪問サービス業向けに、予約・顧客・決済を一元化する業務基盤です。',
    href: 'https://pine-home.com/',
    external: true,
    features: ['LINE / Web予約', '顧客・スケジュール管理', '生成AI機能の拡張予定'],
  },
]

export default function ServiceSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

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
      className="relative overflow-hidden border-t border-sequoia-black/10 bg-color-bg px-6 py-32"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="section-heading mb-6">サービス</h2>
        </motion.div>

        <motion.div
          variants={staggerContainerLoose}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-sequoia-black/12 bg-white shadow-[0_1px_0_rgba(27,25,22,0.04)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-sequoia-green/25 hover:shadow-sm"
              >
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-serif font-bold text-sequoia-black mb-4 flex items-center gap-2 flex-wrap">
                    {service.title}
                  </h3>
                  <p className="text-sequoia-black/85 leading-relaxed mb-6 text-sm lg:text-base">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-sequoia-black/80">
                        <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sequoia-green/50" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  {service.external ? (
                    <a
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full"
                    >
                      詳しく見る
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only">（新しいタブで開く）</span>
                    </a>
                  ) : (
                    <Link href={service.href} className="btn-secondary w-full">
                      詳しく見る
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

