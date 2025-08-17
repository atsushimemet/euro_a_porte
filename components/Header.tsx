'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Item', href: '/items' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Instagram', href: 'https://instagram.com', external: true },
    { name: 'Admin', href: '/admin' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-serif text-xl font-semibold text-primary-800">
              Euro à Porter
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="text-primary-600 hover:text-accent-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="text-primary-600 hover:text-accent-600 transition-colors duration-200"
            >
              ログイン
            </Link>
            <Link
              href="/auth/signup"
              className="btn-primary text-sm px-4 py-2"
            >
              新規登録
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary-600 hover:text-accent-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary-200 bg-white">
            <nav className="flex flex-col space-y-4 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="text-primary-600 hover:text-accent-600 transition-colors duration-200 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/auth/login"
                className="text-primary-600 hover:text-accent-600 transition-colors duration-200 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ログイン
              </Link>
              <Link
                href="/auth/signup"
                className="text-primary-600 hover:text-accent-600 transition-colors duration-200 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                新規登録
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
