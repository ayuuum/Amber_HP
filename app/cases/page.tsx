import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import CaseStudyCard from '@/components/ui/CaseStudyCard'
import ContactCTA from '@/components/ui/ContactCTA'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import { cases } from '@/data/cases'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: '支援事例',
  description: '守秘義務により企業名は非公開の、Amberの支援事例・支援テーマをご紹介します。',
  alternates: { canonical: `${siteUrl}/cases` },
}

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="offwhite"
        eyebrow="支援事例"
        headingLines={['現場で起きた変化を、', '業界と支援内容で伝える。']}
        body="守秘義務により企業名と定量成果は非公開です。課題・実施内容・成果物・変化の定性情報をもとにご紹介します。"
      />
      <section className="home-section bg-white pt-0 md:pt-0">
        <div className="home-container">
          <PageBreadcrumbs items={[{ label: 'トップ', href: '/' }, { label: '支援事例' }]} />
          <div className="mb-8 rounded-2xl border border-sequoia-black/8 bg-off-white px-5 py-4 text-sm leading-relaxed text-secondary md:px-6">
            掲載中の事例はいずれも匿名です。顧客名・ロゴ・削減率などの数値は、確認できないため記載していません。
          </div>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((item) => (
              <li key={item.slug}>
                <CaseStudyCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactCTA source="cases" />
      <Footer />
    </main>
  )
}
