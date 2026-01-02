'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Plus, Image as ImageIcon, LogOut, Home } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // 認証チェック
    const auth = sessionStorage.getItem('adminAuthenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    } else if (pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [pathname, router])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-deep-forest-green text-white border-b border-deep-forest-green/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="text-xl font-bold font-serif">
                ブログ管理
              </Link>
              <div className="flex gap-4">
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-sm transition-colors ${
                    pathname === '/admin' ? 'bg-deep-forest-green/20' : 'hover:bg-deep-forest-green/20'
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  記事一覧
                </Link>
                <Link
                  href="/admin/new"
                  className={`px-3 py-2 rounded-sm transition-colors ${
                    pathname === '/admin/new' ? 'bg-deep-forest-green/20' : 'hover:bg-deep-forest-green/20'
                  }`}
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  新規作成
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="px-3 py-2 rounded-sm hover:bg-deep-forest-green/20 transition-colors"
              >
                <Home className="w-4 h-4 inline mr-2" />
                サイトに戻る
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-sm hover:bg-deep-forest-green/20 transition-colors"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}


