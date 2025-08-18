'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { extractImageUrlFromEmbedCode, extractPostIdFromEmbedCode, isValidEmbedCode, processInstagramEmbeds, getInstagramPlaceholderUrl } from '@/utils/instagramUtils'

interface StylingItem {
  id: string
  name: string
  imageUrl: string
  embedCode?: string
  caption: string
}

export default function InstagramGrid() {
  const [stylingItems, setStylingItems] = useState<StylingItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    fetchStylingItems()
  }, [])

  // Instagram埋め込みコンポーネントの処理
  useEffect(() => {
    if (stylingItems.length > 0) {
      // アイテムが読み込まれた後に少し遅延してからInstagram埋め込みを処理
      const timer = setTimeout(() => {
        processInstagramEmbeds();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [stylingItems])

  // 埋め込みコンポーネントが表示された後の処理
  useEffect(() => {
    const hasEmbedCode = stylingItems.some(item => item.embedCode && isValidEmbedCode(item.embedCode));
    if (hasEmbedCode) {
      // DOMが更新された後にInstagram埋め込みを処理
      const timer = setTimeout(() => {
        processInstagramEmbeds();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [stylingItems])

  const fetchStylingItems = async () => {
    try {
      const response = await fetch('/api/items?styling=true')
      if (response.ok) {
        const items = await response.json()
        const stylingItems = items.map((item: any) => ({
          id: item.id,
          name: item.name,
          imageUrl: item.imageUrl,
          embedCode: item.embedCode,
          caption: `${item.name}の着こなし`
        }))
        setStylingItems(stylingItems)
      }
    } catch (error) {
      console.error('Error fetching styling items:', error)
    } finally {
      setIsLoading(false)
    }
  }

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

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto"></div>
          </div>
        ) : stylingItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stylingItems.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg block bg-white shadow-lg"
              >
                                 <Link 
                   href={`/items/${item.id}`}
                   onMouseEnter={() => setHoveredId(item.id)}
                   onMouseLeave={() => setHoveredId(null)}
                 >
                   <Image
                     src={item.imageUrl}
                     alt={item.caption}
                     width={400}
                     height={400}
                     className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                   />
                   
                   {/* Overlay */}
                   <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end`}>
                     <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                       <p className="text-sm font-medium">{item.caption}</p>
                     </div>
                   </div>
                 </Link>
                
                {/* Instagram投稿表示エリア */}
                {item.embedCode && isValidEmbedCode(item.embedCode) && (
                  <div className="p-4 border-t border-primary-200 bg-primary-50">
                    <h4 className="text-sm font-medium text-primary-700 mb-3">
                      Instagram投稿
                    </h4>
                    <div className="flex items-center space-x-4">
                      {(() => {
                        const postId = extractPostIdFromEmbedCode(item.embedCode);
                        const placeholderUrl = getInstagramPlaceholderUrl(postId);
                        return (
                          <img
                            src={placeholderUrl}
                            alt={`${item.name}のInstagram投稿`}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
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
        ) : (
          <div className="text-center py-12">
            <p className="text-primary-600">スタイリング例がまだ登録されていません</p>
          </div>
        )}

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
