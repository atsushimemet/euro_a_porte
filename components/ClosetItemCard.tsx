'use client'

import { Edit, Eye, EyeOff, MoreVertical, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ImageWithFallback from './ImageWithFallback'

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

interface ClosetItemCardProps {
  item: ClosetItem
  viewMode: 'grid' | 'list'
  onUpdate: () => void
}

export default function ClosetItemCard({ item, viewMode, onUpdate }: ClosetItemCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('このアイテムを削除しますか？')) return
    
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/user/closet/${item.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onUpdate()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleVisibility = async () => {
    try {
      const response = await fetch(`/api/user/closet/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublic: !item.isPublic
        }),
      })

      if (response.ok) {
        onUpdate()
      }
    } catch (error) {
      console.error('Error updating item visibility:', error)
    }
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-primary-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <ImageWithFallback
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary-800 truncate">
                {item.name}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleVisibility()
                  }}
                  className={`p-1 rounded ${
                    item.isPublic 
                      ? 'text-green-600 hover:text-green-700' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title={item.isPublic ? '公開中' : '非公開'}
                >
                  {item.isPublic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMenu(!showMenu)
                    }}
                    className="p-1 text-primary-400 hover:text-primary-600 rounded"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {showMenu && (
                    <div className="absolute right-0 top-8 bg-white border border-primary-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                      <Link
                        href={`/dashboard/edit/${item.id}`}
                        className="w-full px-3 py-2 text-left text-sm text-primary-700 hover:bg-primary-50 flex items-center space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Edit className="w-4 h-4" />
                        <span>編集</span>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowMenu(false)
                          handleDelete()
                        }}
                        disabled={isDeleting}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>{isDeleting ? '削除中...' : '削除'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-primary-600 mt-1 line-clamp-2">
              {item.description}
            </p>
            
            <div className="flex items-center space-x-4 mt-2">
              <span className="bg-accent-100 text-accent-700 text-xs px-2 py-1 rounded-full">
                {item.category}
              </span>
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-primary-500 text-xs">
                    +{item.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-primary-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <div className="aspect-square relative">
          <ImageWithFallback
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleToggleVisibility()
            }}
            className={`p-1 rounded-full bg-white/80 backdrop-blur-sm ${
              item.isPublic 
                ? 'text-green-600 hover:text-green-700' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title={item.isPublic ? '公開中' : '非公開'}
          >
            {item.isPublic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-1 rounded-full bg-white/80 backdrop-blur-sm text-primary-400 hover:text-primary-600"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white border border-primary-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                <Link
                  href={`/dashboard/edit/${item.id}`}
                  className="w-full px-3 py-2 text-left text-sm text-primary-700 hover:bg-primary-50 flex items-center space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="w-4 h-4" />
                  <span>編集</span>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                    handleDelete()
                  }}
                  disabled={isDeleting}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isDeleting ? '削除中...' : '削除'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute top-2 left-2">
          <span className="bg-accent-600 text-white text-xs px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-primary-800 mb-2 line-clamp-1">
          {item.name}
        </h3>
        
        <p className="text-sm text-primary-600 mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-primary-500 text-xs">
              +{item.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
