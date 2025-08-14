'use client'

import Header from '@/components/Header'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    bio: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/auth/login?message=Account created successfully!')
      } else {
        const data = await response.json()
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-800 mb-2">
              アカウント作成
            </h1>
            <p className="text-primary-600">
              あなたのクローゼットを共有しましょう
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-primary-700 mb-2">
                  ユーザー名 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="yamada_taro"
                  />
                </div>
                <p className="text-xs text-primary-500 mt-1">
                  ユーザー名は一意である必要があります
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                  パスワード <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full pl-10 pr-12 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="8文字以上"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-primary-700 mb-2">
                  自己紹介
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="あなたのファッションについて教えてください..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '作成中...' : 'アカウントを作成'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-primary-600">
                すでにアカウントをお持ちですか？{' '}
                <a href="/auth/login" className="text-accent-600 hover:text-accent-700 font-medium">
                  ログイン
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
