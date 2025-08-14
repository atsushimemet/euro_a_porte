'use client'

import Header from '@/components/Header'
import ImageWithFallback from '@/components/ImageWithFallback'
import { ArrowLeft, Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ClosetItem {
  id: string
  name: string
  description: string | null
  imageUrl: string
  category: string
  tags: string[]
  favoritePoints: string | null
  isPublic: boolean
}

const categories = [
  'トップス',
  'ボトムス',
  'ワンピース',
  'アウター',
  'シューズ',
  'バッグ',
  'アクセサリー',
  'その他'
]

export default function EditItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [item, setItem] = useState<ClosetItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: '',
    tags: [] as string[],
    favoritePoints: '',
    isPublic: true
  })
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    fetchItem()
  }, [])

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/user/closet/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setItem(data)
        setFormData({
          name: data.name,
          description: data.description || '',
          imageUrl: data.imageUrl,
          category: data.category,
          tags: data.tags || [],
          favoritePoints: data.favoritePoints || '',
          isPublic: data.isPublic
        })
      } else {
        alert('アイテムの取得に失敗しました')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error fetching item:', error)
      alert('アイテムの取得に失敗しました')
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/user/closet/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('アイテムが更新されました')
        router.push('/dashboard')
      } else {
        const error = await response.json()
        alert(`更新に失敗しました: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating item:', error)
      alert('更新に失敗しました')
    } finally {
      setSaving(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>ダッシュボードに戻る</span>
              </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">アイテムを編集</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* 画像プレビュー */}
              <div className="flex justify-center">
                <div className="relative w-64 h-64">
                  <ImageWithFallback
                    src={formData.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* アイテム名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  アイテム名 *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              {/* 説明 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="アイテムについての説明を入力してください"
                />
              </div>

              {/* 画像URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画像URL *
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              {/* カテゴリー */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリー *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">カテゴリーを選択</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* タグ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タグ
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="タグを入力"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    追加
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* お気に入りポイント */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お気に入りポイント
                </label>
                <textarea
                  value={formData.favoritePoints}
                  onChange={(e) => setFormData({ ...formData, favoritePoints: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="このアイテムのお気に入りポイントや思い出、着こなしのコツなどを自由に書いてください"
                />
              </div>

              {/* 公開設定 */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
                  このアイテムを公開する
                </label>
              </div>

              {/* ボタン */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{saving ? '保存中...' : '保存'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
