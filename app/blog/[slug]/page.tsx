import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getPostByAnySlug,
  getAllPostSlugs,
  getPostContentHtml,
  getCategoryName,
  getCategoryListPath,
  getPostPath,
  getRelatedPosts,
  type BlogPost,
} from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogContent from '@/components/BlogContent'
import JsonLd from '@/components/JsonLd'
import RelatedPosts from '@/components/blog/RelatedPosts'
import InquiryCTA from '@/components/blog/InquiryCTA'
import BlogAuthorCard from '@/components/blog/BlogAuthorCard'
import BlogArticleHeader, { BlogBackLink } from '@/components/blog/BlogArticleHeader'
import { siteUrl } from '@/lib/site-metadata'
import type { ContactInquiryType } from '@/lib/contact'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPostSlugs().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostByAnySlug(params.slug)

  if (!post) {
    return {
      title: '記事が見つかりません',
    }
  }

  const imageUrl = post.cover || '/opengraph-image'
  const imageAlt = post.coverAlt || post.title
  const canonical = `${siteUrl}${getPostPath(post.slug)}`

  return {
    title: `${post.title} | ${getCategoryName(post.category)}`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} | ${getCategoryName(post.category)}`,
      description: post.description,
      url: canonical,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
    alternates: {
      canonical,
    },
  }
}

function buildJsonLd(post: BlogPost) {
  const canonicalUrl = `${siteUrl}${getPostPath(post.slug)}`
  const blogIndexUrl = `${siteUrl}/blog`
  const categoryListUrl = `${siteUrl}${getCategoryListPath(post.category)}`
  const ogImage = post.cover
    ? post.cover.startsWith('http')
      ? post.cover
      : `${siteUrl}${post.cover}`
    : `${siteUrl}/opengraph-image`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: blogIndexUrl },
          {
            '@type': 'ListItem',
            position: 3,
            name: getCategoryName(post.category),
            item: categoryListUrl,
          },
          { '@type': 'ListItem', position: 4, name: post.title, item: canonicalUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        mainEntityOfPage: canonicalUrl,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.dateModified || post.date,
        inLanguage: 'ja-JP',
        keywords: post.keywords,
        image: [ogImage],
        author: {
          '@type': 'Person',
          name: post.author,
          jobTitle: post.authorTitle,
          url: `${siteUrl}/company#representative`,
          worksFor: {
            '@type': 'Organization',
            name: '株式会社Amber',
            url: siteUrl,
          },
        },
        publisher: {
          '@type': 'Organization',
          name: '株式会社Amber',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/opengraph-image`,
          },
        },
        isPartOf: {
          '@type': 'Blog',
          name: 'Amber Insights',
          url: blogIndexUrl,
        },
      },
    ],
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostByAnySlug(params.slug)

  if (!post) {
    notFound()
  }

  const contentHtml = await getPostContentHtml(post.content)
  const relatedPosts = getRelatedPosts(post.category, post.slug, 3)
  const defaultInquiry: ContactInquiryType =
    post.category === 'training' ? 'training' : 'ai-solution'

  return (
    <>
      <JsonLd id="jsonld-blogposting" data={buildJsonLd(post)} />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-off-white/40 via-white to-white px-5 pb-24 pt-28 md:px-8">
        <div className="mx-auto max-w-[760px]">
          <BlogBackLink />
          <article>
            <BlogArticleHeader post={post} category={post.category} />
            <BlogContent html={contentHtml} />
          </article>

          <BlogAuthorCard author={post.author} authorTitle={post.authorTitle} />

          <InquiryCTA
            category={post.category}
            title={post.ctaTitle}
            description={post.ctaDescription}
            label={post.ctaLabel}
            source={post.ctaSource || 'blog'}
            inquiry={(post.ctaInquiry as ContactInquiryType | undefined) || defaultInquiry}
            resourceSlug={post.resourceSlug}
          />

          <RelatedPosts posts={relatedPosts} />
        </div>
      </main>
      <Footer />
    </>
  )
}
