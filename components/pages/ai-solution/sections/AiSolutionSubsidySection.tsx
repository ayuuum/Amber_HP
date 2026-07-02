'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, FileCheck2 } from 'lucide-react'
import { fadeUp } from '../motion'

export default function AiSolutionSubsidySection() {
  return (
    <section id="subsidy" className="border-b border-sequoia-black/10 bg-color-bg">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[0.85fr_1.15fr] md:items-center md:py-28 lg:gap-16">
        <motion.div {...fadeUp}>
          <p className="eyebrow-light mb-4">助成金</p>
          <h2 className="section-heading">
            研修費用は、
            <br />
            助成金で抑えられます
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="rounded-sm border border-sequoia-black/10 bg-color-bg-subtle p-6 md:p-8"
        >
          <div className="mb-6 flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-sequoia-green text-white">
              <FileCheck2 className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="mb-3 text-xl font-bold leading-snug text-sequoia-black md:text-2xl">
                人材開発支援助成金の対象となるケースがあります
              </h3>
              <p className="text-body text-sequoia-black/82">
                当社の生成AI研修は「人材開発支援助成金（事業展開等リスキリング支援コース）」の対象となる可能性があります。
                中小企業の場合、OFF-JTの経費助成率は75%とされています。対象可否の確認や申請に必要な情報整理もサポートします。
              </p>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-sequoia-black/10 bg-sequoia-black/10 sm:grid-cols-3">
            {[
              ['対象確認', '研修内容・対象者・訓練時間を確認'],
              ['計画準備', '申請に必要な情報を整理'],
              ['研修実施', '実施後の支給申請まで見据えて進行'],
            ].map(([title, body]) => (
              <div key={title} className="bg-white p-4">
                <p className="mb-2 text-sm font-bold text-sequoia-black">{title}</p>
                <p className="text-sm leading-relaxed text-sequoia-black/70">{body}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-sequoia-black/55">
            ※制度要件・助成率・支給可否は年度や企業状況により変わります。最終判断は管轄労働局・ハローワークの確認が必要です。
          </p>

          <Link href="#ai-solution-form" className="btn-primary mt-8 w-full sm:w-auto">
            助成金について相談する
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
