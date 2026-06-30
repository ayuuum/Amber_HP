'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { environments, toolCards } from '../data'
import { scrollRevealTransition } from '@/lib/motion-safe'
import { fadeUp } from '../motion'

export default function AiSolutionToolsSection() {
  return (
    <section id="tools" className="border-b border-sequoia-black/10 bg-color-bg-subtle">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <motion.div {...fadeUp} className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
          <p className="eyebrow-light mb-4">環境・ツール</p>
            <h2 className="section-heading mb-0">
              御社の環境に
              <br />
              合わせて設計
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {environments.map((env) => (
              <span
                key={env.name}
                className="rounded-sm border border-sequoia-black/10 bg-white px-3 py-2 text-xs text-sequoia-black/80 md:text-sm"
              >
                {env.name}: {env.summary}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 grid border-y border-sequoia-black/10 md:grid-cols-2 lg:grid-cols-4">
          {toolCards.map((tool, idx) => (
            <motion.div
              key={tool.href}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={scrollRevealTransition(idx)}
              className="border-b border-sequoia-black/10 md:border-r md:last:border-r-0 lg:border-b-0"
            >
              <Link
                href={tool.href}
                className="group flex h-full flex-col bg-white p-5 no-underline transition-[background-color] duration-brand hover:bg-white md:p-6"
              >
                <div className="relative mb-8 h-10 w-full">
                  <Image
                    src={tool.logo}
                    alt=""
                    fill
                    className="object-contain object-left"
                    sizes="(max-width: 768px) 200px, 25vw"
                  />
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sequoia-black/65">
                  {tool.badge}
                </p>
                <h3 className="mb-2 text-base font-bold text-sequoia-black md:text-lg">{tool.name}</h3>
                <p className="mb-4 flex-grow text-sm leading-relaxed text-sequoia-black/85">{tool.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-sequoia-green">
                  詳細を見る
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp}
          className="mt-8 grid gap-4 border-t border-sequoia-black/10 pt-6 md:grid-cols-[220px_1fr_auto] md:items-center"
        >
          <h3 className="text-lg font-bold text-sequoia-black">人材開発支援助成金</h3>
          <p className="text-sm leading-relaxed text-sequoia-black/85 md:text-base">
            Amberのプログラムは、要件を満たす場合に人材開発支援助成金の対象となる可能性があります。
          </p>
          <Link href="/faq" className="text-link text-sm">
            助成金について詳しく見る
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
