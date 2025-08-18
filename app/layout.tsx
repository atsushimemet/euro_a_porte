import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Euro à Porter - ユーロヴィンテージファッション',
  description: 'ユーロヴィンテージの美しさと着こなしを提案するファッションサイト。天然素材・丁寧な縫製が生むアイテムの美しさをお届けします。',
  keywords: 'ユーロヴィンテージ, ファッション, 古着, フランス, リネン, コットン',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
