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
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-color-bg">
      <Header />
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-md text-center">
          <h1 className="heading-h3 mb-4">エラーが発生しました</h1>
          <p className="text-body mb-8 text-sequoia-black/80">
            申し訳ございませんが、予期しないエラーが発生しました。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button onClick={reset} className="btn-primary">
              もう一度試す
            </button>
            <Link href="/" className="btn-secondary">
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
