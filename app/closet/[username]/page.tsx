import ClosetItemGrid from '@/components/ClosetItemGrid'
import Header from '@/components/Header'
import { Grid, User } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

async function getUserData(username: string): Promise<User | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/user/${username}`, {
      cache: 'no-store'
    })
    
    if (response.ok) {
      return response.json()
    }
    return null
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

async function getClosetItems(username: string): Promise<ClosetItem[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/user/${username}/closet`, {
      cache: 'no-store'
    })
    
    if (response.ok) {
      return response.json()
    }
    return []
  } catch (error) {
    console.error('Error fetching closet items:', error)
    return []
  }
}

export default async function ClosetPage({ params }: { params: { username: string } }) {
  const user = await getUserData(params.username)
  const closetItems = await getClosetItems(params.username)

  if (!user || !user.isPublic) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      <div className="container-custom py-16">
        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-accent-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-accent-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary-800 mb-2">
                {user.name}
              </h1>
              <p className="text-primary-600 text-lg mb-3">
                @{user.username}
              </p>
              {user.bio && (
                <p className="text-primary-700 leading-relaxed">
                  {user.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Closet Items Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-2">
                {user.name}のクローゼット
              </h2>
              <p className="text-primary-600">
                {closetItems.length} アイテム
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-primary-600">
                <Grid className="w-5 h-5" />
                <span>グリッド表示</span>
              </div>
            </div>
          </div>

          {closetItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid className="w-12 h-12 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">
                クローゼットが空です
              </h3>
              <p className="text-primary-600">
                まだアイテムが追加されていません
              </p>
            </div>
          ) : (
            <ClosetItemGrid items={closetItems} username={username} />
          )}
        </div>

        {/* Back to Items */}
        <div className="text-center mt-8">
          <Link
            href="/items"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>他のアイテムを見る</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
