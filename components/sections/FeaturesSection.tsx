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
      <div className="section-pad mx-auto max-w-6xl">
        <div className="section-header mb-12 md:mb-20">
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
                  'mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 md:py-16 lg:gap-16 lg:py-20',
                  reversed && 'md:[&>*:first-child]:order-2',
                )}
              >
                <div className={cn('relative', reversed ? 'md:pl-4' : 'md:pr-4')}>
                  <p
                    className="pointer-events-none absolute -left-2 -top-6 select-none text-[5rem] font-black leading-none tracking-tighter text-sequoia-green/10 md:-left-4 md:-top-10 md:text-[7rem] lg:text-[8rem]"
                    aria-hidden
                  >
                    {feature.num}
                  </p>
                  <p className="text-caption mb-3 font-semibold tracking-[0.2em] text-sequoia-green">
                    {feature.num}
                  </p>
                  <h3 className="heading-h3 mb-4">{feature.title}</h3>
                  <p className="text-body max-w-md leading-relaxed text-sequoia-black/80">
                    {feature.desc}
                  </p>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-sequoia-black/10 bg-color-bg-subtle">
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
