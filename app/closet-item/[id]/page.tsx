import Header from '@/components/Header'
import ImageWithFallback from '@/components/ImageWithFallback'
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ClosetItem {
  id: string
  name: string
  description: string
  imageUrl: string
  category: string
  tags: string[]
  isPublic: boolean
  createdAt: string
  user: {
    id: string
    name: string
    username: string
    bio: string
  }
}

async function getClosetItem(id: string): Promise<ClosetItem | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/closet-item/${id}`, {
      cache: 'no-store'
    })
    
    if (response.ok) {
      return response.json()
    }
    return null
  } catch (error) {
    console.error('Error fetching closet item:', error)
    return null
  }
}

export default async function ClosetItemPage({ params }: { params: { id: string } }) {
  const item = await getClosetItem(params.id)

  if (!item || !item.isPublic) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      <div className="container-custom py-16">
        {/* Back Button */}
        <Link
          href={`/closet/${item.user.username}`}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-accent-600 transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} />
          <span>{item.user.name}のクローゼットに戻る</span>
        </Link>

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
              <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2">
                {item.name}
              </h1>
              <span className="bg-accent-600 text-white text-sm px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>

            {/* User Info */}
            <div className="bg-white p-4 rounded-lg border border-primary-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-primary-800">{item.user.name}</p>
                  <Link
                    href={`/closet/${item.user.username}`}
                    className="text-accent-600 hover:text-accent-700 text-sm"
                  >
                    @{item.user.username}
                  </Link>
                </div>
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <div>
                <h2 className="text-xl font-semibold text-primary-800 mb-4">説明</h2>
                <p className="text-primary-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {item.tags.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-primary-800 mb-4 flex items-center space-x-2">
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
            <div className="flex items-center space-x-2 text-primary-600">
              <Calendar className="w-4 h-4" />
              <span>追加日: {formatDate(item.createdAt)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-primary-200">
              <Link
                href={`/closet/${item.user.username}`}
                className="btn-secondary text-center"
              >
                {item.user.name}のクローゼットを見る
              </Link>
              <Link
                href="/items"
                className="btn-primary text-center"
              >
                他のアイテムを見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
