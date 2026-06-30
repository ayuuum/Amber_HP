'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { stages } from '../data'
import { scrollRevealTransition } from '@/lib/motion-safe'
import { cn } from '@/lib/utils'
import { fadeUp } from '../motion'

export default function AiSolutionStagesSection() {
  return (
    <section id="stages" className="border-b border-sequoia-black/10 bg-color-bg">
      <div className="section-pad mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="section-header mb-0">
          <p className="eyebrow-light mb-4">使える → 回る → 残る</p>
          <h2 className="section-heading">
            業務が変わる
            <br />
            3つの段階
          </h2>
        </motion.div>
      </div>

      <div className="space-y-0">
        {stages.map((stage, idx) => {
          const reversed = idx % 2 === 1
          const Icon = stage.icon
          return (
            <motion.div
              key={stage.num}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={scrollRevealTransition(idx * 0.4)}
              className={cn(
                'border-t border-sequoia-black/10',
                idx % 2 === 1 ? 'bg-color-bg-subtle' : 'bg-color-bg',
              )}
            >
              <div
                className={cn(
                  'mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:min-h-[88vh] md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:py-20 lg:gap-20',
                  reversed && 'md:[&>*:first-child]:order-2',
                )}
              >
                <div className={cn('relative z-10', reversed ? 'md:pl-4' : 'md:pr-4')}>
                  <p
                    className="pointer-events-none absolute -left-2 -top-8 select-none text-[6rem] font-black leading-none tracking-tighter text-sequoia-green/10 md:-left-6 md:-top-16 md:text-[10rem] lg:text-[12rem]"
                    aria-hidden
                  >
                    {stage.num}
                  </p>
                  <div className="mb-4 flex items-center gap-3">
                    <Icon className="h-7 w-7 text-sequoia-green" aria-hidden strokeWidth={1.5} />
                    <p className="text-caption font-semibold tracking-[0.2em] text-sequoia-green">
                      {stage.num} {stage.name}
                    </p>
                  </div>
                  <h3 className="mb-4 text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-sequoia-black">
                    {stage.change}
                  </h3>
                  <p className="mb-5 text-base font-semibold text-sequoia-green md:text-lg">
                    {stage.subtitle}
                  </p>
                  <p className="text-body mb-8 max-w-xl leading-relaxed text-sequoia-black/85">
                    {stage.body}
                  </p>
                  <p className="border-l-2 border-sequoia-green pl-4 text-sm font-medium leading-relaxed text-sequoia-black/80">
                    {stage.footer}
                  </p>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-sequoia-black/10 md:aspect-[5/6] lg:aspect-[4/5]">
                  <Image
                    src={stage.image}
                    alt={stage.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
