import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { buildContactHref } from '@/lib/contact'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="home-container flex min-h-[70svh] flex-col items-center justify-center py-28 text-center">
        <p className="home-label mb-4 text-brand-green">404</p>
        <h1 className="home-h2 mb-4">ページが見つかりませんでした</h1>
        <p className="home-body mb-10 max-w-md">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-pill-primary-solid">
            トップへ戻る
          </Link>
          <Link href="/service/ai-solution" className="btn-pill-outline">
            サービスを見る
          </Link>
          <Link href={buildContactHref('404')} className="btn-pill-outline">
            お問い合わせ
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
