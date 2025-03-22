// pages/api/skinlogs/index.js
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const logs = await prisma.skinLog.findMany({
        orderBy: { logDate: 'desc' },
      })

      return res.status(200).json(logs)
    } catch (error) {
      console.error('[SKINLOGS-GET-ERROR]', error)
      return res.status(500).json({ error: '記録取得エラー' })
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        userId,
        logDate,
        conditionRating,
        description,
        location,
        symptoms,
        imageUrl,
      } = req.body

      // ログ確認ポイント：受信したPOSTデータを確認
      console.log('[SKINLOGS-POST-REQ]', req.body)

      const newLog = await prisma.skinLog.create({
        data: {
          userId,
          logDate: logDate ? new Date(logDate) : new Date(),
          conditionRating,
          description,
          location,
          symptoms,
          imageUrl,
        },
      })

      return res.status(200).json(newLog)
    } catch (error) {
      console.error('[SKINLOGS-POST-ERROR]', error)
      return res.status(500).json({ error: '記録登録エラー' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
}
