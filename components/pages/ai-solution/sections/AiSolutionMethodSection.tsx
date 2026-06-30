'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { methodPrinciples, methodVisual } from '../data'
import { scrollRevealTransition } from '@/lib/motion-safe'
import { fadeUp } from '../motion'

export default function AiSolutionMethodSection() {
  return (
    <section id="method" className="section-forest border-b border-sequoia-black/10">
      <div className="mx-auto grid max-w-7xl gap-12 overflow-hidden px-6 py-24 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center md:gap-12 md:py-32 lg:gap-20">
        <motion.div {...fadeUp} className="section-header mb-0 min-w-0">
          <p className="eyebrow-forest mb-4">進め方</p>
          <h2 className="section-heading-invert">
            提案書の前に、
            <br />
            現場へ。
          </h2>
          <p className="section-subheading-invert mt-6 !mx-0 !max-w-2xl text-left">
            {methodVisual.lead}
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-3">
            {methodPrinciples.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={scrollRevealTransition(idx)}
                  className="min-w-0 bg-sequoia-black p-5 md:p-6"
                >
                  <div className="mb-8 flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.18em] text-white/55">
                      {step.num}
                    </span>
                    <Icon className="h-4 w-4 shrink-0 text-white/75" aria-hidden strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold leading-snug text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/75">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={scrollRevealTransition(1)}
          className="relative min-w-0 overflow-hidden rounded-sm border border-white/10 aspect-[4/5] md:h-[min(68vw,640px)] md:aspect-auto"
        >
          <Image
            src={methodVisual.image}
            alt={methodVisual.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 52vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sequoia-black/70 via-sequoia-black/10 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 max-w-md text-lg font-semibold leading-relaxed text-white md:bottom-8 md:left-8">
            見て、設計して、動かして、残す。
          </p>
        </motion.div>
      </div>
    </section>
  )
}
