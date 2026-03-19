import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'ホームサービス事業者向けAI業務OS（開発中） | Vertical SaaS | 株式会社Amber',
    description: '予約管理から施工、請求までをAIで一気通貫。ホームサービス業（ハウスクリーニング・リフォーム等）の現場を深く知るAmberが提供する、次世代のVertical SaaS。業務効率を最大化し、収益性を向上させます。',
    keywords: ['Vertical SaaS', 'ホームサービス業', '業務効率化', 'AI予約管理', '施工管理アプリ', 'DX', '現場DX'],
}

export default function SaaSPage() {
    // Pine への導線を優先するため、Amber側の `service/saas` は外部へリダイレクトします。
    redirect('https://pine-home.com/')
}
