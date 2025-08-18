'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Item {
  id: string
  name: string
  description: string
  history?: string
  imageUrl: string
  stylingUrl?: string
  embedCode?: string

  mainCategory: string
  subCategory: string
  category: string
  tags: string[]
}

interface AdminItemFormProps {
  item?: Item | null
  onSave: ((id: string, itemData: Partial<Item>) => Promise<void>) | ((itemData: Omit<Item, 'id'>) => Promise<void>)
  onCancel: () => void
}

export default function AdminItemForm({ item, onSave, onCancel }: AdminItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    history: '',
    imageUrl: '',
    stylingUrl: '',
    embedCode: '',

    mainCategory: '',
    subCategory: '',
    category: '',
    tags: [] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const categoryStructure = {
    'ワーク': [
      'フレンチワークジャケット',
      'ハンティングジャケット',
      'ビヨード',
      'マキニョンコート',
      'グランパシャツ',
      'ワークパンツ'
    ],
    'ミリタリー': [
      'フランス',
      'イギリス',
      'スウェーデン',
      'ソ連'
    ]
  }

  const mainCategories = Object.keys(categoryStructure)
  const getSubCategories = (mainCategory: string) => categoryStructure[mainCategory as keyof typeof categoryStructure] || []

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        history: item.history || '',
        imageUrl: item.imageUrl,
        stylingUrl: item.stylingUrl || '',
        embedCode: item.embedCode || '',
  
        mainCategory: item.mainCategory || '',
        subCategory: item.subCategory || '',
        category: item.category,
        tags: item.tags
      })
    }
  }, [item])

  // Update category when main/sub categories change
  useEffect(() => {
    if (formData.mainCategory && formData.subCategory) {
      setFormData(prev => ({
        ...prev,
        category: `${prev.mainCategory} - ${prev.subCategory}`
      }))
    }
  }, [formData.mainCategory, formData.subCategory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log('Submitting form data:', formData)
      
      if (item) {
        // Update existing item
        await (onSave as (id: string, itemData: Partial<Item>) => void)(item.id, formData)
      } else {
        // Create new item
        await (onSave as (itemData: Omit<Item, 'id'>) => void)(formData as Omit<Item, 'id'>)
      }
    } catch (error) {
      console.error('Error saving item:', error)
      alert('アイテムの保存に失敗しました。エラーの詳細をコンソールで確認してください。')
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
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
              アイテム名*
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

          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mainCategory" className="block text-sm font-medium text-primary-700 mb-2">
                大分類*
              </label>
              <select
                id="mainCategory"
                value={formData.mainCategory}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    mainCategory: e.target.value,
                    subCategory: '' // Reset subcategory when main category changes
                  })
                }}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              >
                <option value="">大分類を選択</option>
                {mainCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subCategory" className="block text-sm font-medium text-primary-700 mb-2">
                小分類*
              </label>
              <select
                id="subCategory"
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
                disabled={!formData.mainCategory}
              >
                <option value="">小分類を選択</option>
                {getSubCategories(formData.mainCategory).map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Display combined category for reference */}
          {formData.category && (
            <div className="text-sm text-primary-600">
              選択されたカテゴリ: <span className="font-medium">{formData.category}</span>
            </div>
          )}

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
                placeholder="https://example.com/image.jpg"
                required
              />
              {formData.imageUrl.includes('instagram.com') && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>注意:</strong> InstagramのURLが検出されました。実際の画像URL（.jpg, .png, .webpなど）を入力してください。
                  </p>
                </div>
              )}
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
                placeholder="https://example.com/styling.jpg"
              />
            </div>
          </div>

          {/* Instagram Embed Code */}
          <div>
            <label htmlFor="embedCode" className="block text-sm font-medium text-primary-700 mb-2">
              Instagram埋め込みコード（オプション）
            </label>
            <textarea
              id="embedCode"
              value={formData.embedCode}
              onChange={(e) => setFormData({ ...formData, embedCode: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              placeholder="Instagramの埋め込みコードを貼り付けてください"
            />
            <p className="mt-1 text-sm text-primary-600">
              Instagram投稿の「埋め込み」から取得したコードを貼り付けてください
            </p>
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
