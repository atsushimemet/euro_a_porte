'use client'

import AddItemModal from '@/components/AddItemModal'
import ClosetItemCard from '@/components/ClosetItemCard'
import Header from '@/components/Header'
import { Grid, List, LogOut, Plus, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  username: string
  bio: string
  isPublic: boolean
}

interface ClosetItem {
  id: string
  name: string
  description: string
  imageUrl: string
  category: string
  tags: string[]
  isPublic: boolean
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [closetItems, setClosetItems] = useState<ClosetItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchUserData()
    fetchClosetItems()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        router.push('/auth/login')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      router.push('/auth/login')
    }
  }

  const fetchClosetItems = async () => {
    try {
      const response = await fetch('/api/user/closet')
      if (response.ok) {
        const items = await response.json()
        setClosetItems(items)
      }
    } catch (error) {
      console.error('Error fetching closet items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleAddItem = async (itemData: any) => {
    try {
      const response = await fetch('/api/user/closet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      })

      if (response.ok) {
        setShowAddModal(false)
        fetchClosetItems()
      }
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-primary-50">
        <Header />
        <div className="container-custom py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto"></div>
            <p className="mt-4 text-primary-600">読み込み中...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      <div className="container-custom py-16">
        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-accent-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-800">{user?.name}</h1>
                <p className="text-primary-600">@{user?.username}</p>
                {user?.bio && (
                  <p className="text-primary-700 mt-2">{user.bio}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={`/closet/${user?.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                公開ページを見る
              </a>
              <button
                onClick={handleLogout}
                className="text-primary-600 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Closet Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary-800">マイクローゼット</h2>
              <p className="text-primary-600">{closetItems.length} アイテム</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-primary-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-primary-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-primary-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>アイテムを追加</span>
              </button>
            </div>
          </div>

          {/* Closet Items Grid */}
          {closetItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid className="w-12 h-12 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">
                クローゼットが空です
              </h3>
              <p className="text-primary-600 mb-6">
                最初のアイテムを追加して、あなたのクローゼットを始めましょう
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
              >
                アイテムを追加
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {closetItems.map((item) => (
                <ClosetItemCard
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  onUpdate={fetchClosetItems}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
        />
      )}
    </main>
  )
}
