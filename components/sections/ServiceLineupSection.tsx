'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { serviceLineupItems } from '@/lib/service-lineup'
import { scrollRevealTransition } from '@/lib/motion-safe'
import { cn } from '@/lib/utils'

function LineupCard({
  item,
  idx,
  className,
}: {
  item: (typeof serviceLineupItems)[number]
  idx: number
  className?: string
}) {
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={scrollRevealTransition(idx)}
      className={cn('group relative min-w-[300px] flex-shrink-0 snap-start md:min-w-0', className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sequoia-black md:aspect-[5/6] lg:aspect-[4/5]">
        <Image
          src={item.image}
          alt=""
          fill
          className={cn(
            'transition-transform duration-brand group-hover:scale-[1.03]',
            item.image.endsWith('.svg') ? 'object-contain p-10' : 'object-cover',
          )}
          sizes="(max-width: 768px) 280px, 50vw"
        />
        {item.badge ? (
          <span className="absolute left-4 top-4 rounded-sm bg-sequoia-green px-2.5 py-1 text-xs font-semibold text-white">
            {item.badge}
          </span>
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sequoia-black/70 via-sequoia-black/10 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
          <h3 className="mb-3 text-[clamp(2rem,5vw,4rem)] font-bold leading-none tracking-tight text-white">
            {item.title}
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-white/85 md:text-base">{item.summary}</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/95">
            詳細を見る
            {item.external ? (
              <ExternalLink className="h-4 w-4" aria-hidden />
            ) : (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            )}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default function ServiceLineupSection() {
  return (
    <section
      id="lineup"
      className="overflow-hidden border-t border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-32"
      aria-labelledby="lineup-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="section-header mb-12 md:mb-16">
          <p className="eyebrow-light mb-4">ラインナップ</p>
          <h2 id="lineup-heading" className="section-heading">
            2つの事業で、
            <br />
            現場に入る
          </h2>
        </div>

        <div className="lineup-scroll -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:gap-px md:overflow-hidden md:rounded-sm md:bg-sequoia-black/10 md:px-0 md:pb-0">
          {serviceLineupItems.map((item, idx) =>
            item.external ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline"
              >
                <LineupCard item={item} idx={idx} />
                <span className="sr-only">（新しいタブで開く）</span>
              </a>
            ) : (
              <Link key={item.title} href={item.href} className="block no-underline">
                <LineupCard item={item} idx={idx} />
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
