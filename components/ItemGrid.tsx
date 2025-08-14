'use client'

import Image from 'next/image'
import Link from 'next/link'

// サンプルアイテムデータ
const sampleItems = [
  {
    id: '1',
    name: 'リネンブラウス',
    nameEn: 'Linen Blouse',
    category: 'トップス',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
    tags: ['リネン', 'ブラウス', 'トップス', 'フランス']
  },
  {
    id: '2',
    name: 'モールスキンジャケット',
    nameEn: 'Moleskin Jacket',
    category: 'アウター',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    tags: ['モールスキン', 'ジャケット', 'アウター', 'イタリア']
  },
  {
    id: '3',
    name: 'コットンシャツ',
    nameEn: 'Cotton Shirt',
    category: 'トップス',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
    tags: ['コットン', 'シャツ', 'トップス', 'フランス']
  },
  {
    id: '4',
    name: 'ヴィンテージデニム',
    nameEn: 'Vintage Denim',
    category: 'ボトムス',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    tags: ['デニム', 'ジーンズ', 'ボトムス', 'アメリカ']
  },
  {
    id: '5',
    name: 'ウールコート',
    nameEn: 'Wool Coat',
    category: 'アウター',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    tags: ['ウール', 'コート', 'アウター', 'イギリス']
  },
  {
    id: '6',
    name: 'シルクスカーフ',
    nameEn: 'Silk Scarf',
    category: 'アクセサリー',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
    tags: ['シルク', 'スカーフ', 'アクセサリー', 'フランス']
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
            <div className="absolute top-4 left-4">
              <span className="bg-accent-600 text-white text-xs px-2 py-1 rounded-full">
                {item.category}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-2">
              {item.name}
            </h3>
            <p className="text-sm text-primary-600 mb-4 font-serif">
              {item.nameEn}
            </p>
            
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
