'use client'

import Header from '@/components/Header'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 実際の実装では、APIエンドポイントに送信
    console.log('Form submitted:', formData)
    alert('お問い合わせありがとうございます。後日ご連絡いたします。')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              お問い合わせ
            </h1>
            <p className="text-lg text-primary-600">
              ユーロヴィンテージについてのご質問やご意見をお聞かせください
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-8">お気軽にお問い合わせください</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-800 mb-1">メール</h3>
                    <p className="text-primary-600">info@euro-a-porte.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-800 mb-1">電話</h3>
                    <p className="text-primary-600">03-1234-5678</p>
                    <p className="text-sm text-primary-500">平日 9:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-800 mb-1">所在地</h3>
                    <p className="text-primary-600">
                      〒150-0001<br />
                      東京都渋谷区神宮前1-1-1<br />
                      ユーロビル1F
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-primary-800 mb-4">よくあるご質問</h3>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="cursor-pointer text-primary-700 hover:text-accent-600 transition-colors duration-200">
                      Q. ユーロヴィンテージのサイズについて
                    </summary>
                    <p className="mt-2 text-sm text-primary-600 pl-4">
                      ヨーロッパの服は比較的ゆったりとしたシルエットが多く、体型を問わず着やすい特徴があります。
                    </p>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer text-primary-700 hover:text-accent-600 transition-colors duration-200">
                      Q. 洗濯方法について
                    </summary>
                    <p className="mt-2 text-sm text-primary-600 pl-4">
                      天然素材が多いため、基本的には手洗いをお勧めします。詳しくは各アイテムの詳細ページをご確認ください。
                    </p>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer text-primary-700 hover:text-accent-600 transition-colors duration-200">
                      Q. 修理サービスについて
                    </summary>
                    <p className="mt-2 text-sm text-primary-600 pl-4">
                      長く着ることを大切にする文化に基づき、修理サービスも提供しています。お気軽にお問い合わせください。
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">お問い合わせフォーム</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary-700 mb-2">
                    件名 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    <option value="general">一般的なお問い合わせ</option>
                    <option value="product">商品について</option>
                    <option value="repair">修理について</option>
                    <option value="suggestion">ご意見・ご提案</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-2">
                    メッセージ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
                >
                  <Send size={20} />
                  <span>送信する</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
