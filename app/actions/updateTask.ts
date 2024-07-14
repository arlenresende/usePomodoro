'use server'

import prisma from '@/lib/db'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { revalidatePath } from 'next/cache'

export interface TaskProps {
  name: string
  description: string
  type: string
  projectId: string
  status: string
  priority: string
  id: string | null
}

export async function updateDataTask(
  dataTask: TaskProps,
  user: KindeUser | null,
) {
  if (!user) {
    throw new Error('Not authorized')
  }
  try {
    const updateTask = await prisma.task.update({
      where: {
        id: dataTask.id as string,
        userId: user?.id as string,
      },
      data: {
        description: dataTask.description,
        name: dataTask.name,
        type: dataTask.type,
        status: dataTask.status,
        projectId: dataTask.projectId as string,
        priority: dataTask.priority,
      },
    })
    revalidatePath('/', 'layout')
    return updateTask
  } catch (error) {
    console.error(error)
  }
}
