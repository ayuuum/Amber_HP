import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-color-bg">
      <Header />
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-md text-center">
          <p className="text-caption mb-2 font-semibold uppercase tracking-[0.2em] text-sequoia-green">
            404
          </p>
          <h1 className="heading-h3 mb-4">ページが見つかりません</h1>
          <p className="text-body mb-8 text-sequoia-black/80">
            お探しのページは存在しないか、移動または削除された可能性があります。
          </p>
          <Link href="/" className="btn-primary inline-flex">
            ホームに戻る
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
