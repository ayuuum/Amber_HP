'use client'

import { motion } from 'framer-motion'
import { serviceItems } from '../data'
import { fadeUp } from '../motion'
import { scrollRevealTransition } from '@/lib/motion-safe'

export default function AiSolutionServicesSection() {
  return (
    <section id="services" className="border-b border-sequoia-black/10 bg-color-bg">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <motion.div {...fadeUp} className="section-header mb-12 md:mb-14">
          <p className="eyebrow-light mb-4">提供サービス</p>
          <h2 className="section-heading mb-6">
            提供しているのは、
            <br />
            この3つです。
          </h2>
          <p className="text-body max-w-2xl text-sequoia-black/82">
            研修だけ、開発だけに固定しません。業務の状態に合わせて、必要な支援を組み合わせます。
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-sequoia-black/10 bg-sequoia-black/10 md:grid-cols-3">
          {serviceItems.map((item, idx) => (
            <motion.article
              key={item.label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={scrollRevealTransition(idx)}
              className="bg-white p-6 md:min-h-[300px] md:p-8"
            >
              <p className="mb-10 text-xs font-semibold uppercase tracking-[0.18em] text-sequoia-green">
                {String(idx + 1).padStart(2, '0')} / {item.label}
              </p>
              <h3 className="mb-5 text-2xl font-bold leading-tight text-sequoia-black md:text-3xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-sequoia-black/75 md:text-base">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
