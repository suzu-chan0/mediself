'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'

export default function DiagnosisResultsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      const res = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) // MVPでは症状不要
      })

      const data = await res.json()
      setProducts(data)
      setLoading(false)
    }

    fetchRecommendedProducts()
  }, [])

  const handleAddToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCart = [...existingCart, product]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    alert('カートに追加しました')
  }

  return (
    <Layout title="診断結果">
      <div className="space-y-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold">おすすめ商品</h2>
        {loading ? (
          <p>診断結果を読み込んでいます...</p>
        ) : (
          <div className="space-y-4">
            {products.length === 0 ? (
              <p>該当する商品が見つかりませんでした。</p>
            ) : (
              products.map(product => (
                <div key={product.id} className="bg-white p-4 rounded shadow-sm border border-gray-200">
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                  <p className="text-sm text-gray-800 font-semibold mb-1">{product.price}円（税込）</p>
                  <p className="text-xs text-teal-600 mb-2">
                    {product.taxEligible ? 'セルフメディケーション税制対象' : '対象外'}
                  </p>
                  <button
                    className="bg-teal-600 text-white px-4 py-2 rounded"
                    onClick={() => handleAddToCart(product)}
                  >
                    カートに追加する
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
