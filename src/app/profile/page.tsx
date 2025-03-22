'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'

export default function ProfilePage() {
  const [orders, setOrders] = useState<any[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [taxAmount, setTaxAmount] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders')
        const data = await res.json()
        if (res.ok) {
          setOrders(data.orders)
          calculateTotals(data.orders)
        }
      } catch (err) {
        console.error('注文取得エラー', err)
      }
    }

    fetchOrders()
  }, [])

  const calculateTotals = (orders: any[]) => {
    const total = orders.reduce((sum, o) => sum + o.totalAmount, 0)
    const taxTotal = orders.reduce((sum, o) => sum + o.taxEligibleAmount, 0)
    setTotalAmount(total)
    setTaxAmount(taxTotal)
  }

  return (
    <Layout title="マイページ">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold">購入サマリー</h2>
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200 space-y-2">
          <p>購入合計金額：<strong>{totalAmount}円</strong></p>
          <p>税制対象合計：<strong>{taxAmount}円</strong></p>
          <p>購入履歴件数：<strong>{orders.length}件</strong></p>
        </div>
      </div>
    </Layout>
  )
}
