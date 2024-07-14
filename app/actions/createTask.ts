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
}

export async function postDataTask(
  dataTask: TaskProps,
  user: KindeUser | null,
) {
  if (!user) {
    throw new Error('Not authorized')
  }

  const createTask = await prisma.task.create({
    data: {
      userId: user?.id as string,
      description: dataTask.description,
      name: dataTask.name,
      type: dataTask.type,
      status: dataTask.status,
      projectId: dataTask.projectId as string,
      priority: dataTask.priority,
    },
  })
  revalidatePath('/', 'layout')
  return createTask
}
