import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // サンプルアイテムを作成
  const sampleItems = [
    {
      name: 'ヴィンテージデニムジャケット',
      description: '1980年代のアメリカ製デニムジャケット。経年変化による美しい色落ちが特徴です。',
      history: '1980年代にアメリカで製造された本格的なデニムジャケット。当時の職人技が詰まった一品です。',
      imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      category: 'アウター',
      tags: ['デニム', 'ヴィンテージ', 'アメリカ製', 'ジャケット'],
      isStylingExample: true
    },
    {
      name: 'レザーサドルバッグ',
      description: '本革製のクラシックなサドルバッグ。使い込むほどに味が出る高品質なレザーを使用しています。',
      history: 'イタリアの老舗レザー工房で作られた本格的なサドルバッグ。職人の手作業による丁寧な仕上げが特徴です。',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
      category: 'バッグ',
      tags: ['レザー', 'サドルバッグ', 'イタリア製', '本革'],
      isStylingExample: true
    },
    {
      name: 'オックスフォードシャツ',
      description: 'クラシックなオックスフォードシャツ。綿100%の生地で通気性と快適性を両立しています。',
      history: 'イギリスのオックスフォード大学で生まれた伝統的なシャツ。学生服として広まり、現在ではカジュアルウェアの定番となっています。',
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      category: 'トップス',
      tags: ['オックスフォード', 'シャツ', '綿100%', 'クラシック'],
      isStylingExample: false
    },
    {
      name: 'チノパンツ',
      description: 'カジュアルなチノパンツ。適度なストレッチ性で動きやすく、様々なスタイリングに対応できます。',
      history: '軍用パンツとして開発されたチノパンツは、現在ではカジュアルウェアの定番アイテムとなっています。',
      imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      category: 'ボトムス',
      tags: ['チノパンツ', 'カジュアル', 'ストレッチ', '万能'],
      isStylingExample: false
    },
    {
      name: 'スニーカー',
      description: 'クラシックなデザインのスニーカー。日常使いからお出かけまで幅広く活躍します。',
      history: 'スポーツシューズとして開発されたスニーカーは、現在ではファッションアイテムとしても人気があります。',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop',
      stylingUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      category: 'シューズ',
      tags: ['スニーカー', 'クラシック', 'カジュアル', '万能'],
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
