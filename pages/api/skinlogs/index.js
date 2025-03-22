import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const logs = await prisma.skinLog.findMany({
        orderBy: { logDate: 'desc' }
      })
      return res.status(200).json(logs)
    } catch (err) {
      console.error('[GET-LOGS-ERROR]', err)
      return res.status(500).json({ error: 'ログ取得失敗' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { userId, logDate, conditionRating, description, location, symptoms, imageUrl } = req.body
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
    } catch (err) {
      console.error('[POST-LOG-ERROR]', err)
      return res.status(500).json({ error: '記録登録失敗' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
