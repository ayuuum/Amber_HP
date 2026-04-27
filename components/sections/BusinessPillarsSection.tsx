import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const pillars = [
  {
    label: 'AI Solution',
    title: 'AIソリューション事業',
    description:
      'AI導入コンサルティング、AI・Webシステム開発、生成AI研修を組み合わせ、現場の業務に馴染む仕組みを設計・実装します。',
    items: ['業務整理・要件定義', 'AI / Webシステム開発', '研修・運用定着'],
    href: '/service/consulting',
    cta: '開発・導入支援を見る',
  },
  {
    label: 'AI Product',
    title: 'AIプロダクト事業',
    description:
      '個社支援で見えた業界共通課題を、出張訪問サービス業向け予約管理システム「Pine」としてプロダクト化しています。',
    items: ['予約・顧客管理', 'LINE / Web予約', '生成AI機能の拡張'],
    href: 'https://pine-home.com/',
    cta: 'Pineを見る',
    external: true,
  },
]

export default function BusinessPillarsSection() {
  return (
    <section
      className="border-t border-sequoia-black/10 bg-color-bg px-6 pb-16 pt-24 md:pb-20 md:pt-28"
      aria-labelledby="business-pillars-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow-light mb-3 text-center">事業の全体像</p>
        <h2 id="business-pillars-heading" className="section-heading mb-5 text-center">
          個社で磨き、仕組みにする。
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-sequoia-black/80 md:text-lg">
          個別支援で得た知見を整理し、共通する部分をプロダクトに反映します。2つの事業を行き来しながら、現場で使える業務基盤を整えます。
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.label}
              className="interactive-card rounded-sm border border-sequoia-black/12 bg-[#F6F1E8] p-6 shadow-[0_1px_0_rgba(27,25,22,0.04)] md:p-7"
            >
              <p className="mb-3 text-xs font-semibold tracking-wide text-sequoia-black/55">{pillar.label}</p>
              <h3 className="mb-3 text-xl font-bold text-sequoia-black">{pillar.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-sequoia-black/75">{pillar.description}</p>
              <ul className="mb-6 space-y-2 text-sm text-sequoia-black/75">
                {pillar.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sequoia-green/45" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {pillar.external ? (
                <a
                  href={pillar.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link text-sm"
                >
                  {pillar.cta}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">（新しいタブで開く）</span>
                </a>
              ) : (
                <Link href={pillar.href} className="text-link text-sm">
                  {pillar.cta}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
