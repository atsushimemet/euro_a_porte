'use client'

import Link from 'next/link'
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

interface ClosetItemGridProps {
  items: ClosetItem[]
}

export default function ClosetItemGrid({ items }: ClosetItemGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/closet-item/${item.id}`}
          className="group"
        >
          <div className="bg-white border border-primary-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
            <div className="relative">
              <div className="aspect-square relative">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="absolute top-2 left-2">
                <span className="bg-accent-600 text-white text-xs px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-primary-800 mb-2 line-clamp-1 group-hover:text-accent-600 transition-colors duration-200">
                {item.name}
              </h3>
              
              <p className="text-sm text-primary-600 mb-3 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded hover:bg-primary-200 transition-colors duration-200"
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
        </Link>
      ))}
    </div>
  )
}
