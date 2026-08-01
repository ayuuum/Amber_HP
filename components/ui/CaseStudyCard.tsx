import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { CaseItem } from '@/data/cases'

type Props = {
  item: Pick<
    CaseItem,
    | 'slug'
    | 'industry'
    | 'theme'
    | 'status'
    | 'summary'
    | 'challenge'
    | 'support'
    | 'change'
    | 'before'
    | 'after'
    | 'deliverables'
    | 'image'
    | 'imageAlt'
    | 'anonymous'
  >
}

export default function CaseStudyCard({ item }: Props) {
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
            {item.status}
          </span>
          {item.anonymous ? (
            <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2 py-0.5 text-[11px] text-secondary">
              守秘のため匿名
            </span>
          ) : null}
        </div>
        <h3 className="mb-2 text-lg font-medium leading-snug text-sequoia-black">{item.theme}</h3>
        <p className="mb-5 text-sm leading-relaxed text-secondary">{item.summary}</p>

        <dl className="mb-5 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="mb-1 text-xs text-secondary">支援前の課題</dt>
            <dd className="line-clamp-2 text-sequoia-black/80">{item.challenge}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs text-secondary">Amberが実施したこと</dt>
            <dd className="line-clamp-2 text-sequoia-black/80">{item.support}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs text-secondary">導入後の変化</dt>
            <dd className="line-clamp-2 text-sequoia-black/80">{item.change}</dd>
          </div>
        </dl>

        <div className="mb-5">
          <p className="mb-2 text-xs text-secondary">成果物</p>
          <ul className="flex flex-wrap gap-1.5">
            {item.deliverables.slice(0, 3).map((d) => (
              <li key={d} className="rounded-full bg-off-white px-2.5 py-1 text-[11px] text-sequoia-black/75">
                {d}
              </li>
            ))}
            {item.deliverables.length > 3 ? (
              <li className="rounded-full bg-off-white px-2.5 py-1 text-[11px] text-secondary">
                +{item.deliverables.length - 3}
              </li>
            ) : null}
          </ul>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-sequoia-black/8 pt-4 text-xs">
          <div>
            <p className="mb-1 text-secondary">支援前</p>
            <p className="leading-relaxed text-sequoia-black/80">{item.before}</p>
          </div>
          <div>
            <p className="mb-1 text-secondary">支援後</p>
            <p className="leading-relaxed text-sequoia-black/80">{item.after}</p>
          </div>
        </div>
        <Link
          href={`/cases/${item.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
        >
          詳しく見る
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
