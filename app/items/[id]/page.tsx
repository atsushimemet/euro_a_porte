import Header from '@/components/Header'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// サンプルアイテムデータ
const sampleItems = {
  '1': {
    id: '1',
    name: 'リネンブラウス',
    description: 'フランス産の高品質リネンを使用したブラウス。天然素材の風合いと丁寧な縫製が特徴で、長く着られる価値があります。',
    history: 'フランスの伝統的なリネン織物技術を活かして作られたブラウス。リネンは吸湿性と通気性に優れ、夏場の着用に最適です。',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    stylingUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    category: 'トップス',
    tags: ['リネン', 'ブラウス', 'トップス', 'フランス']
  },
  '2': {
    id: '2',
    name: 'モールスキンジャケット',
    description: 'イタリア産のモールスキン生地を使用したジャケット。柔らかく丈夫な素材で、カジュアルからセミフォーマルまで幅広く着用できます。',
    history: 'モールスキンは元々労働者の作業着として使われていた生地で、その耐久性と快適さから現在ではファッションアイテムとしても人気があります。',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    stylingUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop',
    category: 'アウター',
    tags: ['モールスキン', 'ジャケット', 'アウター', 'イタリア']
  }
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = sampleItems[params.id as keyof typeof sampleItems]

  if (!item) {
    return (
      <main className="min-h-screen bg-primary-50">
        <Header />
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold text-primary-800 mb-4">アイテムが見つかりません</h1>
          <Link href="/items" className="btn-primary">
            アイテム一覧に戻る
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      <div className="container-custom py-16">
        {/* Back Button */}
        <Link
          href="/items"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-accent-600 transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} />
          <span>アイテム一覧に戻る</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Item Images */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={800}
                height={600}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {item.stylingUrl && (
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={item.stylingUrl}
                  alt={`${item.name}のスタイリング例`}
                  width={800}
                  height={600}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                  スタイリング例
                </div>
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
                {item.name}
              </h1>
              <span className="bg-accent-600 text-white text-sm px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-800 mb-4">アイテム説明</h2>
              <p className="text-primary-700 leading-relaxed">
                {item.description}
              </p>
            </div>



            {item.history && (
              <div>
                <h2 className="text-xl font-semibold text-primary-800 mb-4">歴史・特徴</h2>
                <p className="text-primary-700 leading-relaxed">
                  {item.history}
                </p>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-primary-800 mb-4">タグ</h2>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-primary-200">
              <h2 className="text-xl font-semibold text-primary-800 mb-4">着こなしのポイント</h2>
              <ul className="space-y-2 text-primary-700">
                <li className="flex items-start space-x-2">
                  <span className="text-accent-600 mt-1">•</span>
                  <span>無印良品のデニムパンツとの組み合わせでカジュアルな印象に</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-600 mt-1">•</span>
                  <span>シンプルなアクセサリーで上品な印象を演出</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-600 mt-1">•</span>
                  <span>長く着ることを前提とした、修理や当て布もおしゃれの一部として楽しむ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
