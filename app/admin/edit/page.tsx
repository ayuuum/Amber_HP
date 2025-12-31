'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Upload, Eye, EyeOff } from 'lucide-react'
import { getPostContentHtml } from '@/lib/markdown-client'

export default function EditArticlePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')
  const category = searchParams.get('category') as 'consulting' | 'training' | 'saas'

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'consulting' as 'consulting' | 'training' | 'saas',
    keywords: [] as string[],
    content: '',
  })
  const [keywordInput, setKeywordInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')

  useEffect(() => {
    if (slug && category) {
      fetchArticle()
    }
  }, [slug, category])

  const fetchArticle = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/articles/${slug}?category=${category}`)
      const data = await response.json()

      if (data.article) {
        setFormData({
          title: data.article.title,
          description: data.article.description,
          date: data.article.date,
          category: data.article.category,
          keywords: data.article.keywords || [],
          content: data.article.content,
        })
      }
    } catch (error) {
      console.error('Error fetching article:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()],
      })
      setKeywordInput('')
    }
  }

  const handleRemoveKeyword = (index: number) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((_, i) => i !== index),
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const uploadFormData = new FormData()
    uploadFormData.append('file', file)
    uploadFormData.append('category', formData.category)

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const data = await response.json()

      if (data.success) {
        const imageMarkdown = `![${file.name}](${data.url})`
        setFormData((prev) => ({
          ...prev,
          content: prev.content + '\n\n' + imageMarkdown + '\n\n',
        }))
      } else {
        alert('画像のアップロードに失敗しました')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('画像のアップロードに失敗しました')
    }
  }

  const handlePreview = async () => {
    if (!showPreview) {
      const html = await getPostContentHtml(formData.content)
      setPreviewHtml(html)
    }
    setShowPreview(!showPreview)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          ...formData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin')
      } else {
        alert(data.error || '記事の更新に失敗しました')
      }
    } catch (error) {
      console.error('Error updating article:', error)
      alert('記事の更新に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-12 text-espresso-brown">読み込み中...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-deep-forest-green mb-8">
        記事編集
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-espresso-brown font-semibold mb-2">
              タイトル <span className="text-warm-amber">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-espresso-brown font-semibold mb-2">
              カテゴリ <span className="text-warm-amber">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green"
            >
              <option value="consulting">AI顧問サービス</option>
              <option value="training">生成AI研修</option>
              <option value="saas">Vertical SaaS</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-espresso-brown font-semibold mb-2">
            説明（SEO用）
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-espresso-brown font-semibold mb-2">
              公開日
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green"
            />
          </div>

          <div>
            <label className="block text-espresso-brown font-semibold mb-2">
              キーワード
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddKeyword()
                  }
                }}
                placeholder="キーワードを入力してEnter"
                className="flex-1 px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green"
              />
              <button
                type="button"
                onClick={handleAddKeyword}
                className="px-4 py-3 bg-stone-gray/30 text-espresso-brown rounded-sm hover:bg-stone-gray/50 transition-colors"
              >
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-warm-amber/20 text-espresso-brown px-3 py-1 rounded-sm text-sm"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(index)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="content" className="block text-espresso-brown font-semibold">
              本文（Markdown） <span className="text-warm-amber">*</span>
            </label>
            <div className="flex gap-2">
              <label className="px-4 py-2 bg-stone-gray/30 text-espresso-brown rounded-sm hover:bg-stone-gray/50 transition-colors cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                画像アップロード
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={handlePreview}
                className="px-4 py-2 bg-stone-gray/30 text-espresso-brown rounded-sm hover:bg-stone-gray/50 transition-colors inline-flex items-center gap-2"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? '編集に戻る' : 'プレビュー'}
              </button>
            </div>
          </div>
          {showPreview ? (
            <div
              className="prose prose-lg max-w-none bg-warm-cream p-6 rounded-sm border border-stone-gray min-h-[500px]"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : (
            <textarea
              id="content"
              name="content"
              required
              value={formData.content}
              onChange={handleChange}
              rows={20}
              className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green resize-none font-mono text-sm"
            />
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-deep-forest-green text-warm-cream px-8 py-4 rounded-sm hover:bg-espresso-brown transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? '保存中...' : '更新する'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border-2 border-deep-forest-green text-deep-forest-green px-8 py-4 rounded-sm hover:bg-deep-forest-green hover:text-warm-cream transition-colors font-semibold"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  )
}

