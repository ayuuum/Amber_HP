import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cases } from '@/data/cases'
import CaseStudyCard from '@/components/ui/CaseStudyCard'
import FadeUp from '@/components/home/FadeUp'

export default function HomeCaseStudies() {
  return (
    <section id="cases" className="home-section scroll-mt-24 bg-off-white" aria-labelledby="cases-heading">
      <div className="home-container">
        <FadeUp className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 id="cases-heading" className="home-h2 mb-4">
              現場の変化が、成果を証明する
            </h2>
            <p className="home-body">
              守秘義務により企業名は非公開です。業界と支援内容をもとに、現場で起きた変化をご紹介します。
            </p>
          </div>
          <Link href="/cases" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-green hover:underline">
            一覧を見る
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </FadeUp>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, i) => (
            <li key={item.slug}>
              <FadeUp delay={0.05 * i}>
                <CaseStudyCard item={item} />
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
