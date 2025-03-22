// pages/api/diagnosis.js
import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const products = await prisma.product.findMany()
      res.status(200).json(products)
    } catch (error) {
      console.error('診断エラー:', error)
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
