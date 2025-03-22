import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        include: {
          symptomProducts: true
        }
      })
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}