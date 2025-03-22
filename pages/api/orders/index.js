import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, totalAmount, taxEligibleAmount, items } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'カートが空です' })
    }

    try {
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
            }))
          }
        }
      })

      return res.status(200).json({ success: true, order })
    } catch (err) {
      console.error('[ORDER-POST-ERROR]', err)
      return res.status(500).json({ error: '注文の登録に失敗しました' })
    }

  } else if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany({
        orderBy: { orderDate: 'desc' },
      })

      return res.status(200).json({ orders })
    } catch (err) {
      console.error('[ORDER-GET-ERROR]', err)
      return res.status(500).json({ error: '注文履歴の取得に失敗しました' })
    }

  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
