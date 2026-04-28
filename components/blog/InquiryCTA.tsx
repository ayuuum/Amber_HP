import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogCategory } from '@/lib/markdown'

type Props = {
  category: BlogCategory
}

const copy: Record<
  BlogCategory,
  {
    eyebrow: string
    heading: string
    body: string
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
  }
> = {
  development: {
    eyebrow: 'AIシステム開発のご相談',
    heading: '現場で動くAIを、設計から定着まで。',
    body: '業務システム、生成AI連携、エージェント開発まで、現場観察から設計・運用までを伴走します。要件が固まっていない段階のご相談から歓迎です。',
    primary: { label: '無料相談する', href: '/company#contact' },
    secondary: { label: 'AIシステム開発の詳細', href: '/service/development' },
  },
  training: {
    eyebrow: '生成AI活用研修のご相談',
    heading: '研修の翌日から、現場が変わる。',
    body: '人材開発支援助成金を活用した、現場で使える生成AI研修プログラムです。導入規模・カリキュラム・申請サポートまで、お気軽にご相談ください。',
    primary: { label: '無料相談する', href: '/company#contact' },
    secondary: { label: '生成AI活用研修の詳細', href: '/service/ai-training' },
  },
}

export default function InquiryCTA({ category }: Props) {
  const c = copy[category]

  return (
    <section
      className="mt-16 overflow-hidden rounded-sm border border-sequoia-black/10 md:mt-20"
      style={{
        background: 'linear-gradient(135deg, #0A1C14 0%, #0F2A1E 60%, #143828 100%)',
      }}
    >
      <div className="px-8 py-12 md:px-12 md:py-16">
        <p
          className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: 'rgb(26 138 85)' }}
        >
          {c.eyebrow}
        </p>
        <h2 className="mb-5 text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl">
          {c.heading}
        </h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
          {c.body}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={c.primary.href}
            className="inline-flex items-center gap-2 rounded-sm px-7 py-3 text-sm font-bold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgb(13 92 58)',
              border: '1px solid rgb(26 138 85 / 0.4)',
            }}
          >
            {c.primary.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={c.secondary.href}
            className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-7 py-3 text-sm font-bold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/10"
          >
            {c.secondary.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
