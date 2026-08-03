'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp } from '../motion'

/** 旧クライアント用。助成金は補助情報として控えめに表示 */
export default function AiSolutionSubsidySection() {
  return (
    <section id="subsidy" className="border-b border-sequoia-black/10 bg-color-bg">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <motion.div {...fadeUp} className="max-w-3xl border-t border-sequoia-black/10 pt-8">
          <h2 className="mb-3 text-lg font-medium text-sequoia-black md:text-xl">
            人材開発支援助成金について
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-sequoia-black/80 md:text-base">
            研修プログラムは、要件を満たす場合に人材開発支援助成金の対象となる可能性があります。補助率・補助額は企業規模や訓練内容により異なります。
          </p>
          <Link href="#ai-solution-form" className="text-sm font-medium text-sequoia-green hover:underline">
            詳細はお問い合わせください
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
