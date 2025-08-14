import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'

export const metadata = {
  title: 'アイテム一覧 - Euro à Porter',
  description: 'ユーロヴィンテージのアイテム一覧。リネン、コットン、デニムなど天然素材の美しいアイテムをご紹介します。',
}

export default function ItemsPage() {
  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
            アイテム一覧
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            天然素材・丁寧な縫製が生むユーロヴィンテージの美しいアイテムたち
          </p>
        </div>
        <ItemGrid />
      </div>
    </main>
  )
}
