'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function TopCtaBlock() {
  return (
    <section className="border-t border-sequoia-black/10 bg-color-bg-subtle px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow-light mb-3">お問い合わせ</p>
        <h2 className="section-heading mx-auto mb-10 max-w-4xl leading-tight">
          まずは、いまの業務を整理するところから。
        </h2>
        <div className="flex justify-center">
          <Link
            href="/company#contact"
            className="btn-primary w-full sm:w-auto min-w-[220px]"
          >
            開発相談をする
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
