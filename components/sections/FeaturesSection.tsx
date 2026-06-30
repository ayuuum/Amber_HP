'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { homeFeatures } from '@/lib/features'
import { scrollRevealTransition } from '@/lib/motion-safe'
import { cn } from '@/lib/utils'

export default function FeaturesSection() {
  return (
    <section
      className="border-t border-sequoia-black/10 bg-color-bg"
      aria-labelledby="features-heading"
    >
      <div className="section-pad mx-auto max-w-7xl">
        <div className="section-header mb-0">
          <p className="eyebrow-light mb-4">Amberの強み</p>
          <h2 id="features-heading" className="section-heading">
            現場に根づく、
            <br className="md:hidden" />
            3つのやり方
          </h2>
        </div>
      </div>

      <div className="space-y-0">
        {homeFeatures.map((feature, idx) => {
          const reversed = idx % 2 === 1
          return (
            <motion.div
              key={feature.num}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={scrollRevealTransition(idx * 0.5)}
              className={cn(
                'border-t border-sequoia-black/10',
                idx % 2 === 1 ? 'bg-color-bg-subtle' : 'bg-color-bg',
              )}
            >
              <div
                className={cn(
                  'mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:min-h-[76vh] md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:py-20 lg:gap-20',
                  reversed && 'md:[&>*:first-child]:order-2',
                )}
              >
                <div className={cn('relative z-10', reversed ? 'md:pl-4' : 'md:pr-4')}>
                  <p
                    className="pointer-events-none absolute -left-2 -top-8 select-none text-[6rem] font-black leading-none tracking-tighter text-sequoia-green/10 md:-left-6 md:-top-16 md:text-[10rem] lg:text-[12rem]"
                    aria-hidden
                  >
                    {feature.num}
                  </p>
                  <p className="text-caption mb-3 font-semibold tracking-[0.2em] text-sequoia-green">
                    {feature.num}
                  </p>
                  <h3 className="mb-5 text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-sequoia-black">
                    {feature.title}
                  </h3>
                  <p className="text-body max-w-xl leading-relaxed text-sequoia-black/80">
                    {feature.desc}
                  </p>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-sequoia-black/10 bg-color-bg-subtle md:aspect-[5/6] lg:aspect-[4/5]">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className={cn(
                      feature.image.endsWith('.svg') ? 'object-contain p-10' : 'object-cover',
                    )}
                    sizes="(max-width: 768px) 100vw, 50vw"
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
