import Link from 'next/link'
import { buildContactHref } from '@/lib/contact'

type ForestCtaSectionProps = {
  headline?: string
  subheadline?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function ForestCtaSection({
  headline = 'お問い合わせ',
  subheadline = 'サービスに関するご質問やご相談は、お気軽にどうぞ。',
  primaryLabel = 'お問い合わせ',
  primaryHref = buildContactHref('forest-cta'),
  secondaryLabel = '企業情報を見る',
  secondaryHref = '/company',
}: ForestCtaSectionProps) {
  return (
    <section
      className="section-forest relative overflow-hidden section-pad border-t border-sequoia-black/10"
      aria-labelledby="forest-cta-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-40"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(245,245,244,0.35) 50%, transparent 100%)',
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 id="forest-cta-heading" className="section-heading-invert mb-4">
          {headline}
        </h2>
        {subheadline ? (
          <p className="section-subheading-invert mb-10">{subheadline}</p>
        ) : null}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href={primaryHref} className="btn-primary-on-dark min-w-[200px]">
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link href={secondaryHref} className="btn-secondary-on-dark min-w-[200px]">
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
