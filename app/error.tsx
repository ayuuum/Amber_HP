'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-warm-cream">
      <Header />
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            エラーが発生しました
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            申し訳ございませんが、予期しないエラーが発生しました。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
            >
              もう一度試す
            </button>
            <Link
              href="/"
              className="rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-gray-400"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

