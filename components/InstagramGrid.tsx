'use client'

import Image from 'next/image'
import { useState } from 'react'

// サンプルデータ（実際のInstagram APIと連携予定）
const samplePosts = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
    caption: 'リネンブラウスとデニムの組み合わせ',
    url: '#'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    caption: 'モールスキンジャケットの着こなし',
    url: '#'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
    caption: 'コットンシャツのシンプルスタイル',
    url: '#'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    caption: 'ヴィンテージデニムの魅力',
    url: '#'
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    caption: 'フランスのリペア文化',
    url: '#'
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
    caption: '天然素材の風合い',
    url: '#'
  },
  {
    id: 7,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    caption: 'ユーロヴィンテージの着こなし',
    url: '#'
  },
  {
    id: 8,
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
    caption: 'シンプルな組み合わせ',
    url: '#'
  },
  {
    id: 9,
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    caption: '長く着られる価値',
    url: '#'
  }
]

export default function InstagramGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            スタイリング例
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            無印良品など現行のシンプルなアイテムとの組み合わせで、
            ユーロヴィンテージの着こなしを提案します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {samplePosts.map((post) => (
            <div
              key={post.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Image
                src={post.imageUrl}
                alt={post.caption}
                width={400}
                height={400}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end`}>
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{post.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Instagramでフォロー</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
