import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'
import HashScrollHandler from '@/components/HashScrollHandler'
import StructuredData from '@/components/StructuredData'
import CustomCursor from '@/components/ui/custom-cursor'
import PageTransitionWrapper from '@/components/PageTransitionWrapper'
import { siteUrl, siteMetadata } from '@/lib/site-metadata'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMetadata.defaultTitle,
    template: '%s | 株式会社Amber',
  },
  description: siteMetadata.description,
  keywords: [...siteMetadata.keywords],
  authors: [{ name: '株式会社Amber' }],
  creator: '株式会社Amber',
  publisher: '株式会社Amber',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteUrl,
    siteName: siteMetadata.name,
    title: siteMetadata.defaultTitle,
    description: siteMetadata.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: '株式会社Amber',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.defaultTitle,
    description: siteMetadata.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${inter.variable}`}>
      <body>
        <StructuredData />
        <CustomCursor />
        <HashScrollHandler />
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
        <Analytics />
      </body>
    </html>
  )
}
