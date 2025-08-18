import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // サンプルアイテムを作成
  const sampleItems = [
    {
      name: 'フレンチワークジャケット',
      description: 'フランスの労働者が着用していた伝統的なワークジャケット。丈夫なモールスキン生地を使用し、実用性と美しさを兼ね備えています。',
      history: '19世紀後期から20世紀初頭にかけて、フランスの農民や工場労働者が着用していた作業着。機能性を重視したデザインが特徴です。',
      imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      mainCategory: 'ワーク',
      subCategory: 'フレンチワークジャケット',
      category: 'ワーク - フレンチワークジャケット',
      tags: ['フランス', 'モールスキン', 'ワーク', 'ヴィンテージ'],
      isStylingExample: true
    },
    {
      name: 'ハンティングジャケット',
      description: '狩猟用に開発された機能的なジャケット。多数のポケットと耐久性に優れた素材が特徴です。',
      history: 'イギリスの貴族階級の狩猟文化から生まれたジャケット。実用性とエレガンスを両立したデザインです。',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
      mainCategory: 'ワーク',
      subCategory: 'ハンティングジャケット',
      category: 'ワーク - ハンティングジャケット',
      tags: ['ハンティング', 'イギリス', '多機能', 'アウトドア'],
      isStylingExample: true
    },
    {
      name: 'グランパシャツ',
      description: 'おじいさんが着るような昔ながらのシャツ。バンドカラーでシンプルなデザインが特徴的です。',
      history: '20世紀初頭のヨーロッパで一般的だった労働者のシャツ。シンプルで機能的なデザインが現代でも愛されています。',
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      mainCategory: 'ワーク',
      subCategory: 'グランパシャツ',
      category: 'ワーク - グランパシャツ',
      tags: ['バンドカラー', 'シンプル', 'ヨーロッパ', 'クラシック'],
      isStylingExample: false
    },
    {
      name: 'フランス軍チノパンツ',
      description: 'フランス軍で使用されていたチノパンツ。丈夫な生地と機能的なカットが特徴です。',
      history: 'フランス軍の制服として開発されたパンツ。軍用としての実用性を追求したデザインが民間にも広まりました。',
      imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      mainCategory: 'ミリタリー',
      subCategory: 'フランス',
      category: 'ミリタリー - フランス',
      tags: ['フランス軍', 'チノ', 'ミリタリー', '実用性'],
      isStylingExample: false
    },
    {
      name: 'イギリス軍ウールジャンパー',
      description: 'イギリス軍で使用されていたウール製のジャンパー。保温性に優れ、丈夫な作りが特徴です。',
      history: 'イギリス軍の寒冷地用装備として開発されたウールジャンパー。厳しい環境下での使用に耐える設計です。',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      mainCategory: 'ミリタリー',
      subCategory: 'イギリス',
      category: 'ミリタリー - イギリス',
      tags: ['イギリス軍', 'ウール', '保温性', '軍用'],
      isStylingExample: false
    }
  ]

  for (const item of sampleItems) {
    await prisma.item.create({
      data: item
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
