'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Globe, MapPin, Phone } from 'lucide-react'
import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import { fadeUpItem, staggerContainer } from '@/lib/motion-safe'
import { cn } from '@/lib/utils'
import { placeholders } from '@/lib/placeholder-images'
import { siteUrl } from '@/lib/site-metadata'

const heroTechModifiers: string[] = ['最新の', '現場で使える', '業務に根づく']

const contactDisplay = {
  website: siteUrl.replace(/^https?:\/\//, ''),
  phone: '080-3814-0263',
  address: '〒105-0001 東京都港区虎ノ門3丁目1-1 2階',
}

const clipFrom = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
const clipTo = 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)'

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className={cn(
        'relative flex min-h-screen w-full flex-col bg-color-bg text-sequoia-black md:flex-row md:overflow-hidden',
        'pt-24 md:pt-20',
      )}
      aria-label="トップヒーロー"
    >
      {/* 左：コピー・CTA・連絡先 */}
      <div
        className={cn(
          'relative z-20 flex w-full flex-col justify-between bg-color-bg px-6 py-10',
          'md:w-1/2 md:px-10 md:py-12 lg:w-3/5 lg:px-14 lg:py-16',
        )}
      >
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-3xl font-bold leading-snug tracking-tight text-sequoia-black text-balance md:text-4xl md:leading-tight lg:text-5xl"
              variants={fadeUpItem}
            >
              <span className="block">暮らしを支える産業に、</span>
              <span className="mt-2 flex flex-col items-start gap-y-1 sm:mt-3 sm:inline-flex sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-0 sm:gap-y-0">
                <span className="inline-flex items-baseline sm:mr-0">
                  <AnimatedTextCycle
                    words={heroTechModifiers}
                    interval={3800}
                    className="text-sequoia-black"
                  />
                </span>
                <span className="font-bold sm:whitespace-nowrap">テクノロジーを。</span>
              </span>
            </motion.h1>

            <motion.div
              className="my-5 h-1 w-20 rounded-sm bg-sequoia-green md:my-6"
              variants={fadeUpItem}
              aria-hidden
            />

            <motion.p
              className="mb-8 max-w-md text-base leading-relaxed text-sequoia-black/75 md:text-lg"
              variants={fadeUpItem}
            >
              AIソリューションとAIプロダクトで、産業の業務基盤を。
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3"
              variants={fadeUpItem}
            >
              <Link
                href="/#services"
                className="text-base font-bold tracking-wide text-sequoia-green transition-colors hover:text-sequoia-green/85 md:text-lg"
              >
                サービスを見る
              </Link>
              <Link
                href="/company#contact"
                className="text-base font-semibold text-sequoia-black/70 underline-offset-4 transition-colors hover:text-sequoia-green md:text-lg"
              >
                お問い合わせ
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.footer
          className="mt-12 w-full border-t border-sequoia-black/10 pt-8 md:mt-14"
          initial="hidden"
          animate="visible"
          variants={fadeUpItem}
        >
          <p className="mb-4 text-xs font-bold tracking-[0.12em] text-sequoia-black/45 md:text-sm">
            連絡先
          </p>
          <ul className="grid grid-cols-1 gap-6 text-xs text-sequoia-black/70 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 lg:grid-cols-3 lg:text-sm">
            <li className="flex gap-3 lg:col-span-1">
              <Globe className="mt-0.5 h-5 w-5 shrink-0 text-sequoia-green" aria-hidden />
              <span className="min-w-0 break-all leading-snug">{contactDisplay.website}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-sequoia-green" aria-hidden />
              <a href="tel:08038140263" className="leading-snug hover:text-sequoia-green">
                {contactDisplay.phone}
              </a>
            </li>
            <li className="flex gap-3 sm:col-span-2 lg:col-span-1">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sequoia-green" aria-hidden />
              <span className="leading-snug">{contactDisplay.address}</span>
            </li>
          </ul>
        </motion.footer>
      </div>

      <div className="relative z-0 h-56 w-full shrink-0 md:hidden">
        <Image
          src={placeholders.mountainHero}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-color-bg via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <motion.div
        className="relative z-0 hidden min-h-[calc(100dvh-5rem)] w-full md:block md:w-1/2 lg:w-2/5"
        initial={prefersReducedMotion ? { clipPath: clipTo } : { clipPath: clipFrom }}
        animate={{ clipPath: clipTo }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <Image
          src={placeholders.mountainHero}
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-color-bg via-color-bg/40 to-transparent"
          aria-hidden
        />
      </motion.div>
    </section>
  )
}
