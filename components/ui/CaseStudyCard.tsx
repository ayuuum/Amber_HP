import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { isCompletedCase, type CaseItem } from '@/data/cases'

type Props = {
  item: Pick<
    CaseItem,
    | 'slug'
    | 'industry'
    | 'enIndustry'
    | 'theme'
    | 'status'
    | 'serviceLabel'
    | 'challenge'
    | 'support'
    | 'change'
    | 'before'
    | 'after'
    | 'image'
    | 'imageAlt'
    | 'anonymous'
  >
  /** トップページ向けの簡潔表示 */
  variant?: 'compact' | 'detailed'
}

export default function CaseStudyCard({ item, variant = 'detailed' }: Props) {
  const completed = isCompletedCase(item.status)
  const afterColumnLabel = completed ? '導入後' : '目指す状態'
  const isCompact = variant === 'compact'

  return (
    <article className="home-card flex h-full flex-col overflow-hidden border border-sequoia-black/8 bg-white">
      <div className="relative aspect-[16/10] bg-sequoia-black/5">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover brightness-[0.88] saturate-[0.8]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <p className="home-label text-brand-green">{item.enIndustry || item.industry}</p>
        </div>

        {!isCompact ? (
          <>
            <p className="mb-2 text-[11px] text-brand-green/90">{item.serviceLabel}</p>
            {item.anonymous ? <p className="mb-2 text-[11px] text-secondary">匿名事例</p> : null}
          </>
        ) : null}

        <h3 className="home-h3 mb-3">{item.theme}</h3>

        {isCompact ? (
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-sequoia-black/80">{item.challenge}</p>
        ) : (
          <dl className="mb-4 space-y-3 text-sm leading-relaxed">
            <div>
              <dt className="mb-1 text-xs text-secondary">業務の課題</dt>
              <dd className="line-clamp-2 text-sequoia-black/80">{item.challenge}</dd>
            </div>
            <div>
              <dt className="mb-1 text-xs text-secondary">取り組み</dt>
              <dd className="line-clamp-2 text-sequoia-black/80">{item.support}</dd>
            </div>
            <div>
              <dt className="mb-1 text-xs text-secondary">
                {completed ? '変化' : '目指す状態'}
              </dt>
              <dd className="line-clamp-2 text-sequoia-black/80">{item.change}</dd>
            </div>
          </dl>
        )}

        {!isCompact ? (
          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-sequoia-black/8 pt-4 text-xs">
            <div>
              <p className="mb-1 text-secondary">導入前</p>
              <p className="leading-relaxed text-sequoia-black/80">{item.before}</p>
            </div>
            <div>
              <p className="mb-1 text-secondary">{afterColumnLabel}</p>
              <p className="leading-relaxed text-sequoia-black/80">{item.after}</p>
            </div>
          </div>
        ) : (
          <div className="mt-auto" />
        )}
        <Link
          href={`/cases/${item.slug}`}
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
        >
          View
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  )
}

