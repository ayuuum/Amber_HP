import Image from 'next/image'
import Link from 'next/link'
import { companyInfo } from '@/lib/company-info'

type Props = {
  author: string
  authorTitle: string
}

export default function BlogAuthorCard({ author, authorTitle }: Props) {
  return (
    <aside className="mt-14 flex gap-5 rounded-2xl border border-sequoia-black/8 bg-off-white p-6 md:mt-16 md:p-8">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white md:h-20 md:w-20">
        <Image
          src="/images/ceo-photo.png"
          alt={author}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-[0.08em] text-sequoia-black/45">WRITTEN BY</p>
        <p className="mt-1 text-lg font-medium text-sequoia-black">
          <Link
            href="/company#representative"
            className="underline-offset-4 hover:text-brand-green hover:underline"
          >
            {author}
          </Link>
        </p>
        <p className="text-sm text-secondary">{authorTitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-sequoia-black/70">
          {companyInfo.legalName}代表。暮らしを支える産業向けに、業務変革とAI・ソフトウェア実装を現場起点で進めています。
        </p>
      </div>
    </aside>
  )
}
