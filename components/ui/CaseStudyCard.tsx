import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { isCompletedCase, type CaseItem } from '@/data/cases'

type Props = {
  item: Pick<
    CaseItem,
    | 'slug'
    | 'industry'
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
}

export default function CaseStudyCard({ item }: Props) {
  const completed = isCompletedCase(item.status)
  const outcomeLabel = completed ? '導入後の変化' : '目指す業務の状態'
  const afterLabel = completed ? 'After' : '目指す状態'

  return (
    <article className="home-card flex h-full flex-col overflow-hidden border border-sequoia-black/6 bg-white">
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
          <p className="home-label text-brand-green">{item.industry}</p>
          <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2 py-0.5 text-[11px] text-secondary">
            {item.status === '支援実績' ? '取り組み事例' : item.status}
          </span>
        </div>
        <p className="mb-2 text-[11px] text-brand-green/90">{item.serviceLabel}</p>
        {item.anonymous ? <p className="mb-2 text-[11px] text-secondary">匿名事例</p> : null}
        <h3 className="mb-3 text-lg font-medium leading-snug text-sequoia-black">{item.theme}</h3>
        <dl className="mb-4 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="mb-1 text-xs text-secondary">支援前の課題</dt>
            <dd className="line-clamp-2 text-sequoia-black/80">{item.challenge}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs text-secondary">支援内容</dt>
            <dd className="line-clamp-2 text-sequoia-black/80">{item.support}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs text-secondary">{outcomeLabel}</dt>
            <dd className="line-clamp-2 text-sequoia-black/80">{item.change}</dd>
          </div>
        </dl>
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-sequoia-black/8 pt-4 text-xs">
          <div>
            <p className="mb-1 text-secondary">Before</p>
            <p className="leading-relaxed text-sequoia-black/80">{item.before}</p>
          </div>
          <div>
            <p className="mb-1 text-secondary">{afterLabel}</p>
            <p className="leading-relaxed text-sequoia-black/80">{item.after}</p>
          </div>
        </div>
        <Link
          href={`/cases/${item.slug}`}
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
        >
          詳しく見る
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
