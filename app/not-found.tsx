import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            ページが見つかりません
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            お探しのページは存在しないか、移動または削除された可能性があります。
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}


