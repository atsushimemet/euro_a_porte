'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Item {
  id: string
  name: string
  nameEn: string
  description: string
  material: string
  history?: string
  imageUrl: string
  stylingUrl?: string
  category: string
  tags: string[]
}

interface AdminItemFormProps {
  item?: Item | null
  onSave: (id: string, itemData: Partial<Item>) => void | ((itemData: Omit<Item, 'id'>) => void)
  onCancel: () => void
}

export default function AdminItemForm({ item, onSave, onCancel }: AdminItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    material: '',
    history: '',
    imageUrl: '',
    stylingUrl: '',
    category: '',
    tags: [] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    'トップス', 'アウター', 'ボトムス', 'ワンピース', 'アクセサリー', 'シューズ', 'バッグ'
  ]

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        nameEn: item.nameEn,
        description: item.description,
        material: item.material,
        history: item.history || '',
        imageUrl: item.imageUrl,
        stylingUrl: item.stylingUrl || '',
        category: item.category,
        tags: item.tags
      })
    }
  }, [item])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (item) {
        // Update existing item
        await (onSave as (id: string, itemData: Partial<Item>) => void)(item.id, formData)
      } else {
        // Create new item
        await (onSave as (itemData: Omit<Item, 'id'>) => void)(formData as Omit<Item, 'id'>)
      }
    } catch (error) {
      console.error('Error saving item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-primary-200">
          <h2 className="text-xl font-semibold text-primary-800">
            {item ? 'アイテムを編集' : 'アイテムを追加'}
          </h2>
          <button
            onClick={onCancel}
            className="text-primary-400 hover:text-primary-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                アイテム名（日本語）*
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              />
            </div>

            {/* Name English */}
            <div>
              <label htmlFor="nameEn" className="block text-sm font-medium text-primary-700 mb-2">
                アイテム名（英語）*
              </label>
              <input
                type="text"
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-primary-700 mb-2">
              カテゴリ*
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              required
            >
              <option value="">カテゴリを選択</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-2">
              説明*
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              required
            />
          </div>

          {/* Material */}
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-primary-700 mb-2">
              素材*
            </label>
            <input
              type="text"
              id="material"
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              required
            />
          </div>

          {/* History */}
          <div>
            <label htmlFor="history" className="block text-sm font-medium text-primary-700 mb-2">
              歴史・特徴
            </label>
            <textarea
              id="history"
              value={formData.history}
              onChange={(e) => setFormData({ ...formData, history: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-primary-700 mb-2">
                メイン画像URL*
              </label>
              <input
                type="url"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              />
            </div>

            {/* Styling URL */}
            <div>
              <label htmlFor="stylingUrl" className="block text-sm font-medium text-primary-700 mb-2">
                スタイリング画像URL
              </label>
              <input
                type="url"
                id="stylingUrl"
                value={formData.stylingUrl}
                onChange={(e) => setFormData({ ...formData, stylingUrl: e.target.value })}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              タグ
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="タグを入力"
                className="flex-1 px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
              >
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent-100 text-accent-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-accent-600 hover:text-accent-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-primary-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  保存中...
                </div>
              ) : (
                item ? '更新' : '追加'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
