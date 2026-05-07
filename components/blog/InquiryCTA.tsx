import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogCategory } from '@/lib/markdown'
import {
  GlassCard,
  GlassCardAction,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

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
    <section className="mt-16 overflow-hidden rounded-2xl border border-sequoia-black/10 bg-[url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop)] bg-cover bg-center p-4 md:mt-20 md:p-8">
      <GlassCard className="mx-auto w-full max-w-3xl">
        <GlassCardHeader>
          <GlassCardTitle className="text-2xl leading-snug tracking-tight text-white md:text-3xl">
            {c.heading}
          </GlassCardTitle>
          <GlassCardDescription className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">
            {c.eyebrow}
          </GlassCardDescription>
          <GlassCardAction>
            <Button variant="link" className="p-0 text-white hover:text-white/80" asChild>
              <Link href={c.secondary.href}>サービス詳細へ</Link>
            </Button>
          </GlassCardAction>
        </GlassCardHeader>
        <GlassCardContent>
          <p className="text-sm leading-relaxed text-white/85 md:text-base">
            {c.body}
          </p>
        </GlassCardContent>
        <GlassCardFooter className="flex-col gap-2 sm:flex-row">
          <Button className="w-full bg-white text-sequoia-black hover:bg-white/90" asChild>
            <Link href={c.primary.href}>
              {c.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="ghost" className="w-full text-white hover:bg-white/15 hover:text-white" asChild>
            <Link href={c.secondary.href}>
              {c.secondary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </GlassCardFooter>
      </GlassCard>
    </section>
  )
}
