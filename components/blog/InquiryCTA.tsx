import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogCategory } from '@/lib/markdown'
import { buildContactHref } from '@/lib/contact'

type Props = {
  category: BlogCategory
}

const copy: Record<
  BlogCategory,
  {
    heading: string
    body: string
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
  }
> = {
  development: {
    heading: '現場で動くAIを、設計から定着まで。',
    body: '業務システム、生成AI連携、エージェント開発まで、現場観察から設計・運用までを伴走します。',
    primary: { label: '開発相談をする', href: buildContactHref('development', 'development') },
    secondary: { label: 'AIシステム開発の詳細', href: '/service/development' },
  },
  training: {
    heading: '研修の翌日から、現場が変わる。',
    body: '人材開発支援助成金を活用した、現場で使える生成AI研修プログラムです。',
    primary: { label: '研修相談をする', href: buildContactHref('training', 'training') },
    secondary: { label: '生成AI活用研修の詳細', href: '/service/ai-training' },
  },
}

export default function InquiryCTA({ category }: Props) {
  const c = copy[category]

  return (
    <section className="section-forest relative mt-16 overflow-hidden rounded-sm border border-sequoia-black/10 md:mt-20">
      <div className="px-6 py-12 md:px-10 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-heading-invert mb-4 text-2xl md:text-3xl">{c.heading}</h2>
          <p className="section-subheading-invert mb-8">{c.body}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={c.primary.href} className="btn-primary-on-dark inline-flex min-w-[200px] items-center justify-center gap-2">
              {c.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={c.secondary.href} className="btn-secondary-on-dark inline-flex min-w-[200px] items-center justify-center gap-2">
              {c.secondary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
