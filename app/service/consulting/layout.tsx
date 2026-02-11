import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'AI導入支援 | 株式会社Amber',
  description: 'AIを「導入する」サービスではなく、AIで「業務のやり方を変える」サービスです。ツール選定から実際の運用まで、横に立って一緒に進める伴走型の支援を提供します。',
  keywords: ['AI導入支援', '業務改善', '業務自動化', '中小企業', 'AIコンサルティング'],
  openGraph: {
    title: 'AI導入支援 | 株式会社Amber',
    description: 'AIを「導入する」サービスではなく、AIで「業務のやり方を変える」サービスです。ツール選定から実際の運用まで、横に立って一緒に進める伴走型の支援を提供します。',
    url: `${siteUrl}/service/consulting`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI導入支援 | 株式会社Amber',
    description: 'AIを「導入する」サービスではなく、AIで「業務のやり方を変える」サービスです。',
  },
  alternates: {
    canonical: `${siteUrl}/service/consulting`,
  },
}

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


