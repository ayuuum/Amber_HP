import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: '法人向け生成AI研修 | 株式会社Amber',
  description: '「AIを知る」ことではなく、「AIが仕事の一部になる」ことを目的とした研修です。実務直結のワークショップで、明日から使えるスキルを身につけます。助成金活用で最大75%OFF。',
  keywords: ['生成AI研修', 'AI研修', '法人向け研修', 'ChatGPT研修', 'リスキリング助成金', 'AI教育'],
  openGraph: {
    title: '法人向け生成AI研修 | 株式会社Amber',
    description: '「AIを知る」ことではなく、「AIが仕事の一部になる」ことを目的とした研修です。実務直結のワークショップで、明日から使えるスキルを身につけます。',
    url: `${siteUrl}/service/training`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '法人向け生成AI研修 | 株式会社Amber',
    description: '「AIを知る」ことではなく、「AIが仕事の一部になる」ことを目的とした研修です。',
  },
  alternates: {
    canonical: `${siteUrl}/service/training`,
  },
}

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


