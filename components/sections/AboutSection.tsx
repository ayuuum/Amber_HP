'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export default function AboutSection() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-40 md:pt-48 lg:pt-56 pb-32 px-6 bg-white/30 relative overflow-hidden"
    >
      {/* 装飾的な背景画像 */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-10 hidden lg:block">
        <Image
          src="/images/about-team.png"
          alt="Amberチームの働く環境"
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 画像セクション */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-96 lg:h-[500px] rounded-sm overflow-hidden shadow-xl"
          >
            <Image
              src="/images/about-team.png"
              alt="Amberチームの働く環境"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* テキストセクション */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-deep-forest-green mb-8"
            >
              About Amber
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-6 text-base md:text-lg leading-relaxed text-deep-forest-green"
            >
              <motion.p variants={itemVariants} className="font-bold text-xl mb-4">
                「現場の努力が、正当に報われる世界へ」
              </motion.p>

              <motion.p variants={itemVariants}>
                私たちは、現場で働く人々の努力が正当に評価され、報われる世界を目指しています。
                実際に現場で9ヶ月間働いた経験から、現場の課題を深く理解しています。
              </motion.p>

              <motion.p variants={itemVariants}>
                日々の業務に追われ、非効率な作業に時間を奪われ、本来注力すべきことに集中できない。そんな現場の課題を、テクノロジーの力で解決します。
              </motion.p>

              <motion.p variants={itemVariants}>
                Amberは、AI顧問サービスとホームサービス事業者向けVertical SaaSを通じて、
                現場の非効率をなくし、働く人の時間と収益を取り戻すことを使命としています。
              </motion.p>

              <motion.p
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="bg-white/50 p-6 rounded-sm border border-deep-forest-green/50"
              >
                テクノロジーを主張しすぎず、現場の声に耳を傾け、丁寧に伴走する。
                それが私たちのアプローチです。無理な営業は一切行いません。
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
