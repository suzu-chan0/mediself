'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, User, Home, Clock, BarChart2 } from 'lucide-react'

export default function Layout({ children, title = 'MediSelf' }) {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartCount(cart.length)
    }
    updateCartCount()

    // 更新時も反映
    window.addEventListener('storage', updateCartCount)
    return () => window.removeEventListener('storage', updateCartCount)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">MediSelf</Link>
          <div className="flex space-x-4">
            <Search size={20} className="cursor-pointer" />
            <Link href="/cart">
              <div className="relative cursor-pointer">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4">
        {children}
      </main>

      <nav className="bg-white border-t border-gray-200 flex justify-around items-center p-3">
        <Link href="/" className="flex flex-col items-center text-sm">
          <Home size={20} />
          <span className="text-xs">ホーム</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center text-sm">
          <Clock size={20} />
          <span className="text-xs">履歴</span>
        </Link>
        <Link href="/tracking" className="flex flex-col items-center text-sm">
          <BarChart2 size={20} />
          <span className="text-xs">記録</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-sm">
          <User size={20} />
          <span className="text-xs">マイページ</span>
        </Link>
      </nav>
    </div>
  )
}
