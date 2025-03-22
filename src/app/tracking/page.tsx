'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function TrackingHistoryPage() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/skinlogs')
        const data = await res.json()
        setLogs(data)
      } catch (error) {
        console.error('肌状態ログの取得に失敗しました', error)
      }
    }
    fetchLogs()
  }, [])

  return (
    <Layout title="肌状態の記録履歴">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">記録履歴一覧</h2>
          <Link href="/tracking/new">
            <button className="bg-teal-600 text-white px-3 py-1 rounded text-sm">＋新規記録</button>
          </Link>
        </div>

        {logs.length === 0 ? (
          <p>記録がまだありません。</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{new Date(log.logDate).toLocaleDateString()}</span>
                  <span>評価: {log.conditionRating ?? 'N/A'}</span>
                </div>
                <p className="text-sm text-gray-800 mb-1">症状: {log.symptoms || '-'}</p>
                <p className="text-sm text-gray-600">部位: {log.location || '-'}</p>
                {log.description && <p className="text-sm mt-1">{log.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
