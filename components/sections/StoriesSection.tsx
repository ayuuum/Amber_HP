'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { storyCases } from '@/lib/stories'
import { scrollRevealTransition } from '@/lib/motion-safe'

export default function StoriesSection() {
  const [featured, ...rest] = storyCases

  return (
    <section
      className="section-forest section-pad border-t border-sequoia-black/10"
      aria-labelledby="stories-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-header mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="stories-heading" className="section-heading-invert">
              導入事例
            </h2>
          </div>
          <Link
            href="/service/ai-solution#proof"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
          >
            すべて見る
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {featured ? (
          <motion.article
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={scrollRevealTransition(0)}
            className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:mb-10 md:p-10"
          >
            <p className="text-caption mb-3 font-semibold uppercase tracking-[0.12em] text-white/60">
              {featured.industry}
            </p>
            <h3 className="heading-h3 mb-8 text-white">{featured.title}</h3>
            <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
              <div>
                <p className="text-caption mb-2 font-semibold uppercase tracking-[0.12em] text-white/45">
                  Before
                </p>
                <p className="text-base leading-relaxed text-white/75 md:text-lg">{featured.before}</p>
              </div>
              <div className="hidden text-2xl text-sequoia-green md:block" aria-hidden>
                →
              </div>
              <div>
                <p className="text-caption mb-2 font-semibold uppercase tracking-[0.12em] text-sequoia-green/90">
                  After
                </p>
                <p className="text-base font-medium leading-relaxed text-white md:text-lg">
                  {featured.after}
                </p>
              </div>
            </div>
            <footer className="mt-8 flex flex-wrap gap-2">
              {featured.metrics.map((m) => (
                <span
                  key={m.label}
                  className="rounded-sm border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-white/80"
                >
                  {m.label}: {m.value}
                </span>
              ))}
            </footer>
          </motion.article>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((story, idx) => (
            <motion.article
              key={story.industry}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={scrollRevealTransition(idx + 1)}
              className="rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
            >
              <p className="text-caption mb-2 font-semibold uppercase tracking-[0.12em] text-white/60">
                {story.industry}
              </p>
              <h3 className="mb-5 text-lg font-bold text-white md:text-xl">{story.title}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-caption mb-1 text-white/45">Before</p>
                  <p className="text-sm leading-relaxed text-white/70">{story.before}</p>
                </div>
                <div>
                  <p className="text-caption mb-1 text-sequoia-green/90">After</p>
                  <p className="text-sm font-medium leading-relaxed text-white/90">{story.after}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-caption text-white/45">※企業名は守秘のため非公開です。</p>
      </div>
    </section>
  )
}
