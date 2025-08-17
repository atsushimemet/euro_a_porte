'use client'

import { useState } from 'react'

interface AdminLoginProps {
  onLogin: (password: string) => void
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 少し遅延を入れてローディング状態を表示
    setTimeout(() => {
      onLogin(password)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="container-custom py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary-800 mb-2">
              管理者ログイン
            </h1>
            <p className="text-primary-600">
              アイテム管理システムにアクセスするにはパスワードを入力してください
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                placeholder="パスワードを入力"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  認証中...
                </div>
              ) : (
                'ログイン'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
