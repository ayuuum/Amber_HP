'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { storyCases } from '@/lib/stories'
import { scrollRevealTransition } from '@/lib/motion-safe'

type StoriesSectionProps = {
  sectionId?: string
  headingId?: string
  showViewAll?: boolean
  showMetrics?: boolean
}

export default function StoriesSection({
  sectionId = 'stories',
  headingId = 'stories-heading',
  showViewAll = true,
  showMetrics = true,
}: StoriesSectionProps) {
  const [featured, ...rest] = storyCases

  return (
    <section
      id={sectionId}
      className="section-forest section-pad border-t border-sequoia-black/10"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-7xl">
        <div className="section-header mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id={headingId} className="section-heading-invert">
              導入事例
            </h2>
          </div>
          {showViewAll ? (
            <Link
              href="/service/ai-solution#proof"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
            >
              すべて見る
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>

        {featured ? (
          <motion.article
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={scrollRevealTransition(0)}
            className="mb-8 overflow-hidden rounded-sm border border-white/10 bg-color-bg md:mb-10"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-6 md:p-10">
                <p className="text-caption mb-3 font-semibold uppercase tracking-[0.12em] text-sequoia-green">
                  {featured.industry}
                </p>
                <h3 className="heading-h3 mb-8 text-sequoia-black">{featured.title}</h3>
                <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                  <div>
                    <p className="text-caption mb-2 font-semibold uppercase tracking-[0.12em] text-sequoia-black/60">
                      Before
                    </p>
                    <p className="text-base leading-relaxed text-sequoia-black md:text-lg">{featured.before}</p>
                  </div>
                  <div className="hidden text-2xl text-sequoia-green md:block" aria-hidden>
                    →
                  </div>
                  <div>
                    <p className="text-caption mb-2 font-semibold uppercase tracking-[0.12em] text-sequoia-green/90">
                      After
                    </p>
                    <p className="text-base font-medium leading-relaxed text-sequoia-black md:text-lg">
                      {featured.after}
                    </p>
                  </div>
                </div>
                {showMetrics && featured.metrics.length > 0 ? (
                  <footer className="mt-8 flex flex-wrap gap-2">
                    {featured.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="rounded-sm border border-sequoia-black/10 bg-sequoia-black/[0.04] px-3 py-1.5 text-xs text-sequoia-black/80"
                      >
                        {m.label}: {m.value}
                      </span>
                    ))}
                  </footer>
                ) : null}
              </div>
            </div>
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
              className="overflow-hidden rounded-sm border border-white/10 bg-color-bg"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-caption mb-2 font-semibold uppercase tracking-[0.12em] text-sequoia-green">
                  {story.industry}
                </p>
                <h3 className="mb-5 text-lg font-bold text-sequoia-black md:text-xl">{story.title}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-caption mb-1 text-sequoia-black/60">Before</p>
                    <p className="text-sm leading-relaxed text-sequoia-black">{story.before}</p>
                  </div>
                  <div>
                    <p className="text-caption mb-1 text-sequoia-green/90">After</p>
                    <p className="text-sm font-medium leading-relaxed text-sequoia-black">{story.after}</p>
                  </div>
                </div>
                {showMetrics && story.metrics.length > 0 ? (
                  <footer className="mt-6 flex flex-wrap gap-2">
                    {story.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="rounded-sm border border-sequoia-black/10 bg-sequoia-black/[0.04] px-3 py-1.5 text-xs text-sequoia-black/80"
                      >
                        {m.label}: {m.value}
                      </span>
                    ))}
                  </footer>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-caption text-white/70">※企業名は守秘のため非公開です。</p>
      </div>
    </section>
  )
}
