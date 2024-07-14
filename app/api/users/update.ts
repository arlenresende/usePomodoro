import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {
      id,
      name,
      email,
      timePomorodo,
      pausePomodoro,
      urlVideo,
      colorScheme,
    } = req.body

    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          timePomorodo: Number(timePomorodo),
          pausePomodoro: Number(pausePomodoro),
          urlVideo,
          colorScheme,
        },
      })
      res.status(200).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to update user' })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} not allowed`)
  }
}
