'use client'

import React from 'react'
import { Edit, LogOut, Plus, Star, Trash2 } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import AdminItemForm from './AdminItemForm'
import { extractImageUrlFromEmbedCode, extractPostIdFromEmbedCode, isValidEmbedCode, processInstagramEmbeds } from '@/utils/instagramUtils'

interface Item {
  id: string
  name: string
  description: string
  history?: string
  imageUrl: string
  stylingUrl?: string
  embedCode?: string
  category: string
  tags: string[]
  isStylingExample?: boolean
}

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showItemForm, setShowItemForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [activeTab, setActiveTab] = useState<'items' | 'styling'>('items')

  useEffect(() => {
    fetchItems()
  }, [])

  // Instagram埋め込みコンポーネントの処理
  useEffect(() => {
    if (items.length > 0) {
      // アイテムが読み込まれた後に少し遅延してからInstagram埋め込みを処理
      const timer = setTimeout(() => {
        processInstagramEmbeds();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [items])

  // 埋め込みコンポーネントが表示された後の処理
  useEffect(() => {
    const hasEmbedCode = items.some(item => item.embedCode && isValidEmbedCode(item.embedCode));
    if (hasEmbedCode) {
      // DOMが更新された後にInstagram埋め込みを処理
      const timer = setTimeout(() => {
        processInstagramEmbeds();
      }, 1000); // より長い遅延を設定
      
      return () => clearTimeout(timer);
    }
  }, [items])

  // タブ切り替え時の埋め込み処理
  useEffect(() => {
    if (activeTab === 'items') {
      const hasEmbedCode = items.some(item => item.embedCode && isValidEmbedCode(item.embedCode));
      if (hasEmbedCode) {
        const timer = setTimeout(() => {
          processInstagramEmbeds();
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [activeTab, items])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items')
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddItem = async (itemData: Omit<Item, 'id'>) => {
    try {
      console.log('Sending item data to API:', itemData)
      
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Item created successfully:', result)
        setShowItemForm(false)
        fetchItems()
      } else {
        const errorData = await response.json()
        console.error('API error:', errorData)
        throw new Error(errorData.error || 'Failed to create item')
      }
    } catch (error) {
      console.error('Error adding item:', error)
      throw error
    }
  }

  const handleUpdateItem = async (id: string, itemData: Partial<Item>) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      })

      if (response.ok) {
        setShowItemForm(false)
        setEditingItem(null)
        fetchItems()
      }
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const handleDeleteItem = async (id: string) => {
    if (!confirm('このアイテムを削除しますか？')) return

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchItems()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handleToggleStylingExample = async (id: string, isStylingExample: boolean) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isStylingExample }),
      })

      if (response.ok) {
        fetchItems()
      }
    } catch (error) {
      console.error('Error updating styling example status:', error)
    }
  }

  const openItemForm = (item?: Item) => {
    setEditingItem(item || null)
    setShowItemForm(true)
  }

  if (isLoading) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-800">管理者ダッシュボード</h1>
        <button
          onClick={onLogout}
          className="btn-secondary flex items-center space-x-2"
        >
          <LogOut size={20} />
          <span>ログアウト</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-primary-100 rounded-lg p-1 mb-8">
        <button
          onClick={() => setActiveTab('items')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'items'
              ? 'bg-white text-primary-800 shadow-sm'
              : 'text-primary-600 hover:text-primary-800'
          }`}
        >
          アイテム管理
        </button>
        <button
          onClick={() => setActiveTab('styling')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'styling'
              ? 'bg-white text-primary-800 shadow-sm'
              : 'text-primary-600 hover:text-primary-800'
          }`}
        >
          スタイリング例設定
        </button>
      </div>

      {activeTab === 'items' && (
        <div>
          {/* Add Item Button */}
          <div className="mb-6">
            <button
              onClick={() => openItemForm()}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>アイテムを追加</span>
            </button>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      画像
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      名前
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      カテゴリ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      タグ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-primary-200">
                  {items.map((item) => (
                    <React.Fragment key={item.id}>
                      <tr className="hover:bg-primary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-primary-900">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-accent-100 text-accent-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                                +{item.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openItemForm(item)}
                              className="text-accent-600 hover:text-accent-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Instagram投稿表示行 */}
                      {item.embedCode && isValidEmbedCode(item.embedCode) && (
                        <tr className="bg-primary-50">
                          <td colSpan={5} className="px-6 py-4">
                            <div className="bg-white rounded-lg p-4 border border-primary-200">
                              <h4 className="text-sm font-medium text-primary-700 mb-3">
                                Instagram投稿
                              </h4>
                              <div className="flex items-center space-x-4">
                                {(() => {
                                  const extractedImageUrl = extractImageUrlFromEmbedCode(item.embedCode);
                                  return extractedImageUrl ? (
                                    <img
                                      src={extractedImageUrl}
                                      alt={`${item.name}のInstagram投稿`}
                                      className="w-32 h-32 object-cover rounded-lg"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  ) : (
                                    <div className="w-32 h-32 bg-primary-100 rounded-lg flex items-center justify-center">
                                      <span className="text-primary-500 text-sm">画像なし</span>
                                    </div>
                                  );
                                })()}
                                <div className="flex-1">
                                  <p className="text-sm text-primary-600">
                                    Instagram投稿の画像を表示しています
                                  </p>
                                  <a
                                    href={extractPostIdFromEmbedCode(item.embedCode) ? 
                                      `https://www.instagram.com/p/${extractPostIdFromEmbedCode(item.embedCode)}/` : 
                                      '#'
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-600 hover:text-accent-800 text-sm mt-2 inline-block"
                                  >
                                    Instagramで見る →
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'styling' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary-800 mb-2">
              スタイリング例に表示するアイテムを選択
            </h2>
            <p className="text-primary-600">
              トップページのスタイリング例に表示するアイテムを選択してください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-colors ${
                  item.isStylingExample
                    ? 'border-accent-500'
                    : 'border-transparent'
                }`}
              >
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.isStylingExample && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-6 h-6 text-accent-500 fill-current" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary-800 mb-3">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => handleToggleStylingExample(item.id, !item.isStylingExample)}
                    className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      item.isStylingExample
                        ? 'bg-accent-100 text-accent-800 hover:bg-accent-200'
                        : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                    }`}
                  >
                    {item.isStylingExample ? 'スタイリング例から削除' : 'スタイリング例に追加'}
                  </button>
                </div>
                {/* Instagram投稿表示エリア */}
                {item.embedCode && isValidEmbedCode(item.embedCode) && (
                  <div className="p-4 border-t border-primary-200 bg-primary-50">
                    <h4 className="text-sm font-medium text-primary-700 mb-3">
                      Instagram投稿
                    </h4>
                    <div className="flex items-center space-x-4">
                      {(() => {
                        const extractedImageUrl = extractImageUrlFromEmbedCode(item.embedCode);
                        return extractedImageUrl ? (
                          <img
                            src={extractedImageUrl}
                            alt={`${item.name}のInstagram投稿`}
                            className="w-24 h-24 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-24 h-24 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="text-primary-500 text-xs">画像なし</span>
                          </div>
                        );
                      })()}
                      <div className="flex-1">
                        <p className="text-sm text-primary-600">
                          Instagram投稿の画像
                        </p>
                        <a
                          href={extractPostIdFromEmbedCode(item.embedCode) ? 
                            `https://www.instagram.com/p/${extractPostIdFromEmbedCode(item.embedCode)}/` : 
                            '#'
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-600 hover:text-accent-800 text-xs mt-1 inline-block"
                        >
                          Instagramで見る →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Item Form Modal */}
      {showItemForm && (
        <AdminItemForm
          item={editingItem}
          onSave={editingItem ? handleUpdateItem : handleAddItem}
          onCancel={() => {
            setShowItemForm(false)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}
