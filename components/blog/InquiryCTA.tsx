import Link from 'next/link'
import type { BlogCategory } from '@/lib/markdown'
import { buildContactHref, type ContactInquiryType } from '@/lib/contact'
import { getResourcePagePath } from '@/lib/resource-paths'

type Props = {
  category: BlogCategory
  title?: string
  description?: string
  label?: string
  source?: string
  inquiry?: ContactInquiryType
  resourceSlug?: string
}

export default function InquiryCTA({
  category,
  title,
  description,
  label,
  source = 'blog',
  inquiry = 'ai-solution',
  resourceSlug,
}: Props) {
  const resolvedTitle =
    title ||
    (resourceSlug ? '無料資料をダウンロード' : '自社業務へのAI活用について相談する')
  const resolvedDescription =
    description ||
    (category === 'training'
      ? '研修や内製化を含め、現場で使える進め方を一緒に整理します。'
      : resourceSlug
        ? '必要事項の入力後、チェックリスト・プレイブックをダウンロードできます。'
        : '業務変革、AI・ソフトウェア、データ連携まで、課題の整理からご相談ください。')
  const resolvedLabel =
    label || (resourceSlug ? '資料を受け取る' : 'AI活用について相談する')
  const href = resourceSlug
    ? getResourcePagePath(resourceSlug)
    : buildContactHref(source, inquiry)

  return (
    <section className="mt-16 rounded-2xl border border-sequoia-black/8 bg-off-white px-6 py-12 text-center md:mt-20 md:px-10 md:py-14">
      <h2 className="home-h3 mb-4">{resolvedTitle}</h2>
      <p className="home-body mx-auto mb-8 max-w-xl">{resolvedDescription}</p>
      <Link href={href} className="btn-pill-primary-solid inline-flex">
        {resolvedLabel}
      </Link>
    </section>
  )
}
