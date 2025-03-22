// pages/api/diagnosis.js
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { symptoms } = req.body

      // ↓ ログ確認ポイント：リクエストボディの中身確認
      console.log('[DIAGNOSIS-REQ]', symptoms)

      // MVP仕様：常に全商品を返す
      const products = await prisma.product.findMany()

      return res.status(200).json(products)
    } catch (error) {
      console.error('[DIAGNOSIS-POST-ERROR]', error)
      return res.status(500).json({ error: '診断処理中にエラーが発生しました' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
}
