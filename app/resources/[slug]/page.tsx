import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ResourceLeadForm from '@/components/resources/ResourceLeadForm'
import BlogContent from '@/components/BlogContent'
import {
  getAllResources,
  getResourceBySlug,
  getResourcePagePath,
} from '@/lib/resources'
import { getPostBySlug, getPostContentHtml, getCategoryPath } from '@/lib/markdown'
import { siteMetadata, siteUrl } from '@/lib/site-metadata'
import { buildContactHref } from '@/lib/contact'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllResources().map((resource) => ({ slug: resource.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = getResourceBySlug(params.slug)
  if (!resource) {
    return { title: `資料が見つかりません | ${siteMetadata.name}` }
  }

  return {
    title: `${resource.title} | 無料資料 | ${siteMetadata.name}`,
    description: resource.description,
    keywords: resource.keywords,
    alternates: {
      canonical: `${siteUrl}${getResourcePagePath(resource.slug)}`,
    },
  }
}

export default async function ResourceDetailPage({ params }: Props) {
  const resource = getResourceBySlug(params.slug)
  if (!resource) {
    notFound()
  }

  const previewHtml = await getPostContentHtml(resource.content)
  const relatedLinks = resource.relatedArticleSlugs
    .map((slug) => {
      const post = getPostBySlug('development', slug)
      if (!post) return null
      return {
        slug,
        title: post.title,
        href: `${getCategoryPath('development')}/${slug}`,
      }
    })
    .filter((item): item is { slug: string; title: string; href: string } => item !== null)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-5 pb-24 pt-28 md:px-8">
        <div className="mx-auto max-w-[800px]">
          <Link href="/resources" className="mb-8 inline-block text-sm text-sequoia-black/55 hover:underline">
            ← 資料一覧
          </Link>

          <h1 className="home-h2 mb-4">{resource.title}</h1>
          <p className="home-body mb-10 text-sequoia-black/70">{resource.description}</p>

          <ResourceLeadForm slug={resource.slug} resourceTitle={resource.title} />

          <section className="mt-14">
            <h2 className="home-h3 mb-4">資料の内容（プレビュー）</h2>
            <BlogContent html={previewHtml} />
          </section>

          {relatedLinks.length > 0 ? (
            <section className="mt-12 border-t border-sequoia-black/8 pt-8">
              <h2 className="home-h3 mb-4">関連記事</h2>
              <ul className="space-y-2">
                {relatedLinks.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.href} className="text-sequoia-black/80 underline-offset-2 hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-12 rounded-2xl border border-sequoia-black/8 px-6 py-8 text-center">
            <p className="home-body mb-4">資料を読んだうえで、進め方を相談したい場合はこちら。</p>
            <Link
              href={buildContactHref(`resource-${resource.slug}`, 'demo')}
              className="btn-pill-primary-solid inline-flex"
            >
              デモ・相談を予約する
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
