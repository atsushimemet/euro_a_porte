'use client'

import Image from 'next/image'
import Link from 'next/link'

// サンプルアイテムデータ
const sampleItems = [
  {
    id: '1',
    name: 'フレンチワークジャケット',
    mainCategory: 'ワーク',
    subCategory: 'フレンチワークジャケット',
    category: 'ワーク - フレンチワークジャケット',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
    tags: ['フランス', 'モールスキン', 'ワーク', 'ヴィンテージ']
  },
  {
    id: '2',
    name: 'ハンティングジャケット',
    mainCategory: 'ワーク',
    subCategory: 'ハンティングジャケット',
    category: 'ワーク - ハンティングジャケット',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    tags: ['ハンティング', 'イギリス', '多機能', 'アウトドア']
  },
  {
    id: '3',
    name: 'ビヨード',
    mainCategory: 'ワーク',
    subCategory: 'ビヨード',
    category: 'ワーク - ビヨード',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
    tags: ['フランス', 'ワーク', 'ヴィンテージ', 'コットン']
  },
  {
    id: '4',
    name: 'フランス軍チノパンツ',
    mainCategory: 'ミリタリー',
    subCategory: 'フランス',
    category: 'ミリタリー - フランス',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    tags: ['フランス軍', 'チノ', 'ミリタリー', '実用性']
  },
  {
    id: '5',
    name: 'イギリス軍ウールジャンパー',
    mainCategory: 'ミリタリー',
    subCategory: 'イギリス',
    category: 'ミリタリー - イギリス',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    tags: ['イギリス軍', 'ウール', '保温性', '軍用']
  },
  {
    id: '6',
    name: 'スウェーデン軍フィールドジャケット',
    mainCategory: 'ミリタリー',
    subCategory: 'スウェーデン',
    category: 'ミリタリー - スウェーデン',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
    tags: ['スウェーデン軍', 'フィールド', 'ミリタリー', '北欧']
  }
]

export default function ItemGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sampleItems.map((item) => (
        <Link
          key={item.id}
          href={`/items/${item.id}`}
          className="card group hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={400}
              height={400}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 space-y-1">
              <span className="bg-accent-600 text-white text-xs px-2 py-1 rounded-full block">
                {item.mainCategory}
              </span>
              <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-full block">
                {item.subCategory}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {item.name}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
