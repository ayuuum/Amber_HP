'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function TopCtaBlock() {
  return (
    <section className="px-6 py-28">
      <div className="surface-card-strong mx-auto max-w-5xl px-8 py-12 text-center md:px-12 md:py-14">
        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-sequoia-green/80">
          お問い合わせ
        </p>
        <h2 className="mb-5 text-3xl font-serif font-bold text-sequoia-black md:text-4xl">
          現場に合う進め方を、最初の相談で一緒に整理します。
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-sequoia-black/75 md:text-lg">
          何から始めるべきか分からない段階でも大丈夫です。課題の棚卸しから、導入の優先順位まで一緒に考えます。
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <Link
            href="/company#contact"
            className="btn-primary w-full sm:w-auto min-w-[220px]"
          >
            お問い合わせ
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/blog"
            className="btn-secondary w-full sm:w-auto min-w-[220px]"
          >
            実務記事を見る
          </Link>
        </div>
      </div>
    </section>
  )
}
