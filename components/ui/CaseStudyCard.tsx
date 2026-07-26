import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { CaseItem } from '@/data/cases'

type Props = {
  item: Pick<CaseItem, 'slug' | 'industry' | 'theme' | 'challenge' | 'change' | 'before' | 'after' | 'image' | 'imageAlt' | 'anonymous'>
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
        <p className="home-label mb-2 text-brand-green">{item.industry}</p>
        {item.anonymous ? <p className="mb-2 text-[11px] text-secondary">匿名事例</p> : null}
        <h3 className="mb-3 text-lg font-medium leading-snug text-sequoia-black">{item.theme}</h3>
        <p className="mb-4 text-sm leading-relaxed text-secondary line-clamp-3">{item.change}</p>
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-sequoia-black/8 pt-4 text-xs">
          <div>
            <p className="mb-1 text-secondary">Before</p>
            <p className="leading-relaxed text-sequoia-black/80">{item.before}</p>
          </div>
          <div>
            <p className="mb-1 text-secondary">After</p>
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
