'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    symptomLocation: '',
    symptomType: '',
    symptomDuration: '',
    pain: '',
    pastTreatment: '',
  })
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    localStorage.setItem('diagnosis_symptoms', JSON.stringify(formData))
    setShowModal(false)
    router.push('/diagnosis/results')
  }

  return (
    <Layout title="ホーム">
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-lg font-semibold">あなたの肌の悩みを解決します</h2>
          <p className="text-gray-600">症状に合わせたOTC薬のレコメンドと肌状態の記録ができます</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => setShowModal(true)}
            >
              症状を診断する
            </button>
            <Link href="/tracking/new">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full">
                肌状態を記録する
              </button>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">お悩みカテゴリー</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/category/acne">
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition transform hover:scale-[1.02]">
                <h4 className="font-medium mb-1">ニキビケア</h4>
                <p className="text-sm text-gray-600 mb-2">思春期ニキビから大人ニキビまで</p>
                <ChevronRight size={16} className="text-teal-600" />
              </div>
            </Link>
            <Link href="/category/acne">
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition transform hover:scale-[1.02]">
                <h4 className="font-medium mb-1">美白</h4>
                <p className="text-sm text-gray-600 mb-2">シミ・くすみケア</p>
                <ChevronRight size={16} className="text-teal-600" />
              </div>
            </Link>
            <Link href="/category/acne">
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition transform hover:scale-[1.02]">
                <h4 className="font-medium mb-1">肌の乾燥</h4>
                <p className="text-sm text-gray-600 mb-2">乾燥肌のケア製品</p>
                <ChevronRight size={16} className="text-teal-600" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-semibold">症状の診断</h3>
              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">症状の場所</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2" onChange={(e) => handleChange('symptomLocation', e.target.value)}>
                  <option value="">選択してください</option>
                  <option value="face">顔全体</option>
                  <option value="forehead">額</option>
                  <option value="cheek">頬</option>
                  <option value="chin">あご</option>
                  <option value="back">背中</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">症状の種類</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2" onChange={(e) => handleChange('symptomType', e.target.value)}>
                  <option value="">選択してください</option>
                  <option value="white">白ニキビ</option>
                  <option value="black">黒ニキビ</option>
                  <option value="red">赤ニキビ</option>
                  <option value="yellow">黄色ニキビ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">症状の期間</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2" onChange={(e) => handleChange('symptomDuration', e.target.value)}>
                  <option value="">選択してください</option>
                  <option value="short">1週間未満</option>
                  <option value="medium">1週間〜1ヶ月</option>
                  <option value="long">1ヶ月以上</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">痛み</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="pain" value="yes" onChange={() => handleChange('pain', 'yes')} className="mr-2" />はい
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="pain" value="no" onChange={() => handleChange('pain', 'no')} className="mr-2" />いいえ
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">過去の治療・使用薬</label>
                <textarea className="w-full border border-gray-300 rounded-md px-3 py-2" onChange={(e) => handleChange('pastTreatment', e.target.value)}></textarea>
              </div>
              <button onClick={handleSubmit} className="bg-teal-600 text-white w-full py-2 rounded-lg font-semibold">
                診断結果を見る
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
