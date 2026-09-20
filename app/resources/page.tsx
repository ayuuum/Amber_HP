import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllResources, getResourcePagePath } from '@/lib/resources'
import { siteMetadata, siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: `無料資料・チェックリスト | ${siteMetadata.name}`,
  description:
    '現場業務の自動化、データ連携、AIエージェント、定着・事例検討向けのチェックリストとプレイブックを無料で提供しています。',
  alternates: {
    canonical: `${siteUrl}/resources`,
  },
}

export default function ResourcesIndexPage() {
  const resources = getAllResources()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-5 pb-24 pt-28 md:px-8">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-3 text-sm tracking-[0.12em] text-sequoia-black/50">RESOURCES</p>
          <h1 className="home-h2 mb-4">無料資料・チェックリスト</h1>
          <p className="home-body mb-12 max-w-2xl text-sequoia-black/70">
            導入前の整理やパイロット設計に使える実務向け資料です。必要事項の入力後にダウンロードできます。
          </p>

          <ul className="space-y-4">
            {resources.map((resource) => (
              <li key={resource.slug} className="border-b border-sequoia-black/8 pb-4">
                <Link href={getResourcePagePath(resource.slug)} className="group block">
                  <h2 className="home-h3 mb-2 group-hover:underline">{resource.title}</h2>
                  <p className="home-body text-sequoia-black/65">{resource.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
