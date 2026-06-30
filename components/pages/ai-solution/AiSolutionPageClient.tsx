'use client'

import { motion } from 'framer-motion'
import ForestCtaSection from '@/components/sections/ForestCtaSection'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import StoriesSection from '@/components/sections/StoriesSection'
import type { BlogPost } from '@/lib/markdown'
import { buildContactHref } from '@/lib/contact'
import AiSolutionHero from './sections/AiSolutionHero'
import AiSolutionStagesSection from './sections/AiSolutionStagesSection'
import AiSolutionMethodSection from './sections/AiSolutionMethodSection'
import AiSolutionContrastSection from './sections/AiSolutionContrastSection'
import AiSolutionToolsSection from './sections/AiSolutionToolsSection'
import { gaps } from './data'
import { fadeUp, itemMotion } from './motion'

type AiSolutionPageClientProps = {
  blogPosts: BlogPost[]
}

export default function AiSolutionPageClient({ blogPosts }: AiSolutionPageClientProps) {
  return (
    <main className="min-h-screen bg-color-bg">
      <AiSolutionHero />

      <section
        id="gap"
        className="section-forest relative min-h-[82vh] overflow-hidden border-b border-sequoia-black/10 px-6 py-24 md:flex md:items-center md:py-32"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20"
          aria-hidden
        />
        <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-end md:gap-16">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="eyebrow-forest mb-5">よくある状態</p>
            <h2 className="section-heading-invert mb-8 text-[clamp(2.25rem,6vw,5.5rem)] leading-[1.05]">
              AIを入れても、
              <br />
              現場は変わらない。
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              ツールを配っても、業務は変わりません。変えるべきなのは、使う人、業務の流れ、残る仕組みです。
            </p>
          </motion.div>

          <div className="space-y-1 border-y border-white/10">
            {gaps.map((g, idx) => {
              const Icon = g.icon
              return (
                <motion.div
                  key={g.title}
                  {...itemMotion(idx)}
                  className="grid gap-4 border-b border-white/10 py-6 last:border-b-0 md:grid-cols-[48px_1fr] md:py-8"
                >
                  <Icon className="h-7 w-7 text-white/80" aria-hidden strokeWidth={1.5} />
                  <div>
                    <h3 className="mb-3 text-xl font-semibold leading-snug text-white md:text-2xl">
                      {g.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/75 md:text-base">{g.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <AiSolutionStagesSection />
      <AiSolutionMethodSection />
      <AiSolutionContrastSection />
      <StoriesSection
        sectionId="proof"
        headingId="proof-heading"
        showViewAll={false}
        showMetrics={false}
      />
      <AiSolutionToolsSection />

      <BlogPreviewSection posts={blogPosts} categories={['development', 'training']} />

      <div id="contact">
        <ForestCtaSection
          headline="AI活用を相談"
          subheadline="使える・回る・残るまで、現場から一緒に進めます。"
          primaryLabel="AI活用を相談"
          primaryHref={buildContactHref('ai-solution', 'ai-solution')}
        />
      </div>
    </main>
  )
}
