'use client'

import { Plus, Upload, X, X as XIcon } from 'lucide-react'
import { useState } from 'react'
import ImageWithFallback from './ImageWithFallback'

interface AddItemModalProps {
  onClose: () => void
  onAdd: (itemData: any) => void
}

export default function AddItemModal({ onClose, onAdd }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: '',
    tags: [] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    'トップス', 'アウター', 'ボトムス', 'ワンピース', 'アクセサリー', 'シューズ', 'バッグ'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onAdd(formData)
      onClose()
    } catch (error) {
      console.error('Error adding item:', error)
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
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary-800">
              アイテムを追加
            </h2>
            <button
              onClick={onClose}
              className="text-primary-400 hover:text-primary-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* アイテム名 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                アイテム名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                placeholder="リネンブラウス"
              />
            </div>

            {/* 説明 */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-2">
                説明
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                placeholder="アイテムについて詳しく説明してください..."
              />
            </div>

            {/* 画像URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-primary-700 mb-2">
                画像URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                <input
                  type="url"
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <p className="text-xs text-primary-500 mt-1">
                画像のURLを入力してください（Unsplash、Imgur等）
              </p>
            </div>

            {/* カテゴリ */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-primary-700 mb-2">
                カテゴリ <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                <option value="">カテゴリを選択</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* タグ */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                タグ
              </label>
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="タグを入力"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-primary-500 hover:text-primary-700"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-primary-500 mt-1">
                例: リネン、ブラウス、フランス、ヴィンテージ
              </p>
            </div>

            {/* プレビュー */}
            {formData.imageUrl && (
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  プレビュー
                </label>
                <div className="border border-primary-200 rounded-lg p-4">
                  <div className="aspect-square relative mb-3">
                    <ImageWithFallback
                      src={formData.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-primary-800">{formData.name || 'アイテム名'}</h3>
                  {formData.description && (
                    <p className="text-sm text-primary-600 mt-1">{formData.description}</p>
                  )}
                  {formData.category && (
                    <span className="inline-block bg-accent-100 text-accent-700 text-xs px-2 py-1 rounded-full mt-2">
                      {formData.category}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* ボタン */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-primary-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '追加中...' : 'アイテムを追加'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
