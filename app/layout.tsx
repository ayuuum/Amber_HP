import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_JP } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'
import StructuredData from '@/components/StructuredData'
import { siteUrl, siteMetadata } from '@/lib/site-metadata'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-logo',
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
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
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
    <html lang="ja" className={`${notoSerifJP.variable} ${cormorantGaramond.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
