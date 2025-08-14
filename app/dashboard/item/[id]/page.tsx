'use client'

import Header from '@/components/Header'
import ImageWithFallback from '@/components/ImageWithFallback'
import { ArrowLeft, Calendar, Edit, Heart, Tag, User } from 'lucide-react'
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
  createdAt: string
  user: {
    id: string
    name: string | null
    username: string
    bio: string | null
  }
}

interface User {
  id: string
  name: string | null
  username: string
  bio: string | null
}

export default function MyItemDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState<ClosetItem | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    fetchItem()
    checkCurrentUser()
  }, [])

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/user/closet/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setItem(data)
        } else {
          alert('アイテムが見つかりません')
          router.push('/dashboard')
        }
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

  const checkCurrentUser = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const user = await response.json()
        setCurrentUser(user)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isOwner = currentUser && item && item.user && currentUser.id === item.user.id

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

  if (!item || !item.user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">アイテムが見つかりません</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
            
            {isOwner && (
              <button
                onClick={() => router.push(`/dashboard/edit/${item.id}`)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <Edit size={16} />
                <span>編集</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Item Image */}
            <div className="relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src={item.imageUrl}
                alt={item.name}
                width={800}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Item Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {item.name}
                </h1>
                <span className="bg-accent-600 text-white text-sm px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* User Info */}
              {item.user && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.user.name}</p>
                      <p className="text-accent-600 text-sm">
                        @{item.user.username}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              {item.description && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">説明</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Favorite Points */}
              {item.favoritePoints && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>お気に入りポイント</span>
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.favoritePoints}
                    </p>
                  </div>
                </div>
              )}

              {/* Tags */}
              {item.tags.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Tag className="w-5 h-5" />
                    <span>タグ</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm hover:bg-primary-200 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Date Added */}
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>追加日: {formatDate(item.createdAt)}</span>
              </div>

              {/* Public Status */}
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  item.isPublic 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.isPublic ? '公開中' : '非公開'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  マイクローゼットに戻る
                </button>
                {isOwner && (
                  <button
                    onClick={() => router.push(`/dashboard/edit/${item.id}`)}
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    アイテムを編集
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
