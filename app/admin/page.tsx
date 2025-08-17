'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import AdminLogin from '@/components/AdminLogin'
import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // セッションストレージから認証状態を確認
    const authStatus = sessionStorage.getItem('adminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (password: string) => {
    if (password === '19930322') {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuthenticated', 'true')
    } else {
      alert('パスワードが正しくありません')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuthenticated')
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-primary-50">
        <Header />
        <div className="container-custom py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </main>
  )
}
