'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { FileText, Plus, LogOut, Home } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function verify() {
      if (pathname === '/admin/login') {
        setChecking(false)
        return
      }

      try {
        const response = await fetch('/api/admin/articles', { credentials: 'include' })
        if (!response.ok) {
          if (!cancelled) router.replace('/admin/login')
          return
        }
        if (!cancelled) setIsAuthenticated(true)
      } catch {
        if (!cancelled) router.replace('/admin/login')
      } finally {
        if (!cancelled) setChecking(false)
      }
    }

    verify()
    return () => {
      cancelled = true
    }
  }, [pathname, router])

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE', credentials: 'include' })
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (checking || !isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-green-dark text-white border-b border-green-dark/20">
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
                    pathname === '/admin' ? 'bg-green-dark/20' : 'hover:bg-green-dark/20'
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  記事一覧
                </Link>
                <Link
                  href="/admin/new"
                  className={`px-3 py-2 rounded-sm transition-colors ${
                    pathname === '/admin/new' ? 'bg-green-dark/20' : 'hover:bg-green-dark/20'
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
                className="px-3 py-2 rounded-sm hover:bg-green-dark/20 transition-colors"
              >
                <Home className="w-4 h-4 inline mr-2" />
                サイトに戻る
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-sm hover:bg-green-dark/20 transition-colors"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
