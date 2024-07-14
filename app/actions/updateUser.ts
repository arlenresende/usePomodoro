'use server'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export interface DatauserProps {
  id: string | null
  name: string | null
  email: string
  timePomorodo: string
  pausePomodoro: string
  urlVideo: string
  colorScheme: string
}

export async function PostData(userId: string, data: DatauserProps) {
  try {
    const dataUpdate = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        email: data.email,
        timePomorodo: Number(data.timePomorodo),
        pausePomodoro: Number(data.pausePomodoro),
        urlVideo: data.urlVideo,
        colorScheme: data.colorScheme,
      },
    })
    revalidatePath('/', 'layout')

    return dataUpdate
  } catch (error) {
    console.error(error)
  }
}
