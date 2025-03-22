'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [taxTotal, setTaxTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
    calculateTotals(cart)
  }, [])

  const calculateTotals = (items: any[]) => {
    let totalAmount = 0
    let taxEligibleAmount = 0
    items.forEach(item => {
      totalAmount += item.price
      if (item.taxEligible) taxEligibleAmount += item.price
    })
    setTotal(totalAmount)
    setTaxTotal(taxEligibleAmount)
  }

  const handlePurchase = async () => {
    if (!cartItems.length) return alert('カートが空です')

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'test-user-1',
        totalAmount: total,
        taxEligibleAmount: taxTotal,
        items: cartItems
      })
    })

    if (res.ok) {
      alert('購入が完了しました')
      localStorage.removeItem('cart')
      setCartItems([])
      setTotal(0)
      setTaxTotal(0)
      window.dispatchEvent(new Event('storage'))
      router.push('/history')
    } else {
      const data = await res.json()
      alert('購入に失敗しました: ' + (data.error || '不明なエラー'))
    }
  }

  return (
    <Layout title="カート">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">カート内商品</h2>
          <Link href="/cart" className="text-teal-600 flex items-center space-x-1">
            <ShoppingCart size={20} />
            <span className="text-sm font-medium">カート</span>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 border p-4 rounded-md">カートに商品がありません。</div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl shadow border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">{item.price}円（税込）</p>
                    <p className="text-xs text-teal-600 mt-1">
                      {item.taxEligible ? 'セルフメディケーション税制対象' : '対象外'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 text-right">
              <p className="text-sm font-medium">合計金額：{total}円</p>
              <p className="text-sm font-medium">税制対象合計：{taxTotal}円</p>
              <button
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-xl shadow"
                onClick={handlePurchase}
              >
                購入する
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
