// pages/api/orders/index.js
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany({
        include: { orderItems: true },
        orderBy: { orderDate: 'desc' },
      })

      return res.status(200).json(orders)
    } catch (error) {
      console.error('[ORDERS-GET-ERROR]', error)
      return res.status(500).json({ error: '注文取得エラー' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { userId, totalAmount, taxEligibleAmount, items } = req.body

      console.log('[ORDERS-POST-REQ]', req.body)

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'カートが空です' })
      }

      const order = await prisma.order.create({
        data: {
          userId,
          totalAmount,
          taxEligibleAmount,
          status: 'completed',
          orderItems: {
            create: items.map(item => ({
              productId: item.id,
              quantity: 1,
              price: item.price,
            })),
          },
        },
      })

      return res.status(200).json({ success: true, order })
    } catch (error) {
      console.error('[ORDERS-POST-ERROR]', error)
      return res.status(500).json({ error: '注文登録エラー' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
}
