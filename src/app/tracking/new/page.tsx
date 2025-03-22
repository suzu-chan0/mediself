'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/navigation'

export default function TrackingNewLogPage() {
  const [form, setForm] = useState({
    conditionRating: '',
    symptoms: '',
    location: '',
    description: '',
  })
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/skinlogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'test-user-1',
        ...form,
        conditionRating: parseInt(form.conditionRating),
      })
    })
    if (res.ok) {
      alert('記録を保存しました')
      router.push('/tracking')
    } else {
      alert('記録の保存に失敗しました')
    }
  }

  return (
    <Layout title="肌状態を記録">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold">肌状態の記録フォーム</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">肌状態評価 (1〜5)</label>
            <input type="number" min="1" max="5" required value={form.conditionRating} onChange={(e) => handleChange('conditionRating', e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 text-sm">症状</label>
            <input type="text" value={form.symptoms} onChange={(e) => handleChange('symptoms', e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 text-sm">部位</label>
            <input type="text" value={form.location} onChange={(e) => handleChange('location', e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 text-sm">詳細・メモ</label>
            <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} className="w-full border px-3 py-2 rounded h-24"></textarea>
          </div>
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded w-full">保存する</button>
        </form>
      </div>
    </Layout>
  )
}
