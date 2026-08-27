import Link from 'next/link'
import type { BlogCategory } from '@/lib/markdown'
import { buildContactHref } from '@/lib/contact'

type Props = {
  category: BlogCategory
}

export default function InquiryCTA({ category }: Props) {
  const href = buildContactHref('blog', 'ai-solution')

  return (
    <section className="mt-16 rounded-2xl border border-sequoia-black/8 bg-off-white px-6 py-12 text-center md:mt-20 md:px-10 md:py-14">
      <h2 className="home-h3 mb-4">自社業務へのAI活用について相談する</h2>
      <p className="home-body mx-auto mb-8 max-w-xl">
        {category === 'training'
          ? '研修や内製化を含め、現場で使える進め方を一緒に整理します。'
          : '業務変革、AI・ソフトウェア、データ連携まで、課題の整理からご相談ください。'}
      </p>
      <Link href={href} className="btn-pill-primary-solid inline-flex">
        AI活用について相談する
      </Link>
    </section>
  )
}
