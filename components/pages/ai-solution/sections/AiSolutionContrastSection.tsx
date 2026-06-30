'use client'

import { motion } from 'framer-motion'
import { contrastColumns } from '../data'
import { fadeUp } from '../motion'
import { scrollRevealTransition } from '@/lib/motion-safe'
import { cn } from '@/lib/utils'

export default function AiSolutionContrastSection() {
  return (
    <section id="contrast" className="border-b border-sequoia-black/10 bg-color-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div {...fadeUp} className="section-header mb-12 md:mb-16">
          <p className="eyebrow-light mb-4">比較</p>
          <h2 className="section-heading mb-6">
            片方だけでは、
            <br />
            終わらない
          </h2>
          <p className="text-body max-w-2xl text-sequoia-black/85">
            研修会社でもSIerでも片方だけでは終わらない。現場から一気通貫で伴走する、それがAmberです。
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-sequoia-black/10 bg-sequoia-black/10 md:grid-cols-3">
          {contrastColumns.map((col, idx) => (
            <motion.article
              key={col.label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={scrollRevealTransition(idx)}
              className={cn(
                'min-h-[360px] bg-color-bg p-7 md:p-8 lg:p-10',
                col.tone === 'accent' && 'bg-sequoia-green text-white',
              )}
            >
              <p
                className={cn(
                  'mb-16 text-xs font-semibold uppercase tracking-[0.2em] text-sequoia-black/60',
                  col.tone === 'accent' && 'text-white/65',
                )}
              >
                {String(idx + 1).padStart(2, '0')}
              </p>
              <h3
                className={cn(
                  'mb-5 text-3xl font-bold leading-tight tracking-tight text-sequoia-black md:text-4xl',
                  col.tone === 'accent' && 'text-white',
                )}
              >
                {col.label}
              </h3>
              <p
                className={cn(
                  'mb-8 text-lg font-semibold leading-relaxed text-sequoia-black/82',
                  col.tone === 'accent' && 'text-white',
                )}
              >
                {col.summary}
              </p>
              <p
                className={cn(
                  'text-sm leading-relaxed text-sequoia-black/75 md:text-base',
                  col.tone === 'accent' && 'text-white/85',
                )}
              >
                {col.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
