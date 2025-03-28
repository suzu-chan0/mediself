'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'

export default function HistoryPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [taxTotal, setTaxTotal] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders')
      const data = await res.json()
      const fetchedOrders = data.orders || []
      setOrders(fetchedOrders)

      let t = 0
      let taxT = 0
      fetchedOrders.forEach((order: any) => {
        t += order.totalAmount || 0
        taxT += order.taxEligibleAmount || 0
      })
      setTotal(t)
      setTaxTotal(taxT)
    }

    fetchOrders()
  }, [])

  return (
    <Layout title="購入履歴">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold">購入履歴</h2>

        {orders.length === 0 ? (
          <p>まだ購入履歴がありません。</p>
        ) : (
          <>
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div key={idx} className="bg-white p-4 rounded border shadow-sm">
                  <p className="text-sm text-gray-600">
                    注文日: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm">合計金額: {order.totalAmount}円</p>
                  <p className="text-sm">税制対象額: {order.taxEligibleAmount}円</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 text-right">
              <p className="text-sm font-semibold">全体合計: {total}円</p>
              <p className="text-sm font-semibold text-teal-600">税制対象合計: {taxTotal}円</p>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
