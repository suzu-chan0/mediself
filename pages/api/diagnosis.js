// pages/api/diagnosis.js
import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const products = await prisma.product.findMany()
      return res.status(200).json(products)
    } catch (err) {
      console.error('[DIAGNOSIS POST ERROR]', err)
      return res.status(500).json({ error: 'サーバーエラー' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
}
