'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Edit, Trash2, Eye, Plus } from 'lucide-react'
import Link from 'next/link'

type Article = {
  slug: string
  title: string
  category: string
  date: string
}

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const router = useRouter()

  const fetchArticles = useCallback(async () => {
    setIsLoading(true)
    try {
      const categoryParam = selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''
      const response = await fetch(`/api/admin/articles${categoryParam}`)
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedCategory])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const handleDelete = async (slug: string, category: string) => {
    if (!confirm('この記事を削除しますか？')) return

    try {
      const response = await fetch(`/api/admin/articles?slug=${slug}&category=${category}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchArticles()
      } else {
        alert('削除に失敗しました')
      }
    } catch (error) {
      console.error('Error deleting article:', error)
      alert('削除に失敗しました')
    }
  }

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      consulting: 'AI顧問サービス',
      training: '生成AI研修',
      saas: 'Vertical SaaS',
    }
    return names[category] || category
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-serif font-bold text-deep-forest-green">
          記事一覧
        </h1>
        <Link
          href="/admin/new"
          className="bg-deep-forest-green text-white px-6 py-3 rounded-sm hover:bg-deep-forest-green transition-colors font-semibold inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          新規作成
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          {['all', 'consulting', 'training', 'saas'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-sm transition-colors ${selectedCategory === cat
                  ? 'bg-deep-forest-green text-white'
                  : 'bg-white/30 text-deep-forest-green hover:bg-white/50'
                }`}
            >
              {cat === 'all' ? 'すべて' : getCategoryName(cat)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-deep-forest-green">読み込み中...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-deep-forest-green">
          <p className="mb-4">記事がありません</p>
          <Link
            href="/admin/new"
            className="inline-block bg-deep-forest-green text-white px-6 py-3 rounded-sm hover:bg-deep-forest-green transition-colors font-semibold"
          >
            最初の記事を作成
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {articles.map((article, index) => (
            <motion.div
              key={`${article.category}-${article.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-6 rounded-sm border border-deep-forest-green shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs bg-deep-forest-green text-white px-2 py-1 rounded-sm font-semibold">
                      {getCategoryName(article.category)}
                    </span>
                    <span className="text-sm text-deep-forest-green/70">
                      {new Date(article.date).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-deep-forest-green mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-deep-forest-green">
                    /service/{article.category}/blog/{article.slug}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/service/${article.category}/blog/${article.slug}`}
                    target="_blank"
                    className="p-2 bg-white/30 text-deep-forest-green rounded-sm hover:bg-white/50 transition-colors"
                    title="プレビュー"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`/admin/edit?slug=${article.slug}&category=${article.category}`}
                    className="p-2 bg-deep-forest-green text-white rounded-sm hover:bg-deep-forest-green transition-colors"
                    title="編集"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(article.slug, article.category)}
                    className="p-2 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors"
                    title="削除"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}


