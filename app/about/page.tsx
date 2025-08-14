import Header from '@/components/Header'
import Image from 'next/image'

export const metadata = {
  title: 'About - ユーロヴィンテージとは - Euro à Porter',
  description: 'ユーロヴィンテージの魅力とフランスのリペア文化について。天然素材・丁寧な縫製が生むアイテムの美しさをご紹介します。',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              ユーロヴィンテージとは
            </h1>
            <p className="text-lg text-primary-600">
              「ユーロを着よう！」という行動喚起で、男女問わずユーロヴィンテージの認知を拡大する
            </p>
          </div>

          <div className="space-y-16">
            {/* コンセプト */}
            <section>
              <h2 className="text-3xl font-bold text-primary-800 mb-8">コンセプト</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">天然素材・丁寧な縫製が生むアイテムの美しさ</h3>
                  <p className="text-primary-700 leading-relaxed mb-4">
                    リネンやコットンなど、風合い豊かな素材感と職人技による耐久性。
                    ヨーロッパの伝統的な織物技術が生み出す、時間を経ても美しいアイテムたち。
                  </p>
                  <p className="text-primary-700 leading-relaxed">
                    日本の古着市場ではアメリカヴィンテージが主流ですが、
                    ユーロヴィンテージは独特の色味やパターン、そして丁寧な作りが特徴です。
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                    alt="天然素材の美しさ"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </section>

            {/* ロープライス */}
            <section>
              <h2 className="text-3xl font-bold text-primary-800 mb-8">ロープライスで誰でも着られる</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative overflow-hidden rounded-lg order-2 md:order-1">
                  <Image
                    src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop"
                    alt="アクセシブルな価格"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">年齢・性別・体型を問わないシルエット</h3>
                  <p className="text-primary-700 leading-relaxed mb-4">
                    ユーロヴィンテージは、多くの場合リーズナブルな価格で手に入ります。
                    高級感のある素材とデザインでありながら、誰でも気軽に楽しめる価格帯が魅力です。
                  </p>
                  <p className="text-primary-700 leading-relaxed">
                    また、ヨーロッパの服は比較的ゆったりとしたシルエットが多く、
                    体型を問わず着やすいという特徴があります。
                  </p>
                </div>
              </div>
            </section>

            {/* リペア文化 */}
            <section>
              <h2 className="text-3xl font-bold text-primary-800 mb-8">フランスのリペア文化</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">「長く着る」価値観</h3>
                  <p className="text-primary-700 leading-relaxed mb-4">
                    フランスでは、服を長く大切に着る文化が根付いています。
                    修理や当て布をポジティブに捉え、むしろおしゃれの一部として楽しむ文化があります。
                  </p>
                  <p className="text-primary-700 leading-relaxed mb-4">
                    この文化は、サステナブルファッションの観点からも注目されており、
                    大量消費社会に対する一つの答えとしても評価されています。
                  </p>
                  <p className="text-primary-700 leading-relaxed">
                    私たちも、この「長く着る」価値観を大切にし、
                    修理やカスタマイズを通じて服との関係を深めていくことを提案します。
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop"
                    alt="リペア文化"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </section>

            {/* 自由な着こなし */}
            <section>
              <h2 className="text-3xl font-bold text-primary-800 mb-8">カテゴリに縛られない服の楽しみ方</h2>
              <div className="text-center">
                <p className="text-lg text-primary-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                  ユーロヴィンテージの魅力は、型に嵌めない自由な着こなしにあります。
                  メンズアイテムをレディースが着たり、ワークウェアをカジュアルに着たり。
                  既存のカテゴリにとらわれない、自由なファッションの楽しみ方を提案します。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-primary-800 mb-2">ミックススタイリング</h4>
                    <p className="text-sm text-primary-600">
                      無印良品など現行のシンプルなアイテムとの組み合わせで、参入障壁を下げます
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-primary-800 mb-2">ジェンダーレス</h4>
                    <p className="text-sm text-primary-600">
                      男女問わず着られるデザインで、より多くの人に楽しんでいただけます
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-primary-800 mb-2">サステナブル</h4>
                    <p className="text-sm text-primary-600">
                      長く着ることを前提とした、環境に配慮したファッションを提案します
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
