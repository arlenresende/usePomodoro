'use server'

import prisma from '@/lib/db'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { revalidatePath } from 'next/cache'

export async function deleteDataTask(id: string, user: KindeUser | null) {
  if (!user) {
    throw new Error('Not authorized')
  }

  const createProject = await prisma.task.delete({
    where: {
      id,
    },
  })
  revalidatePath('/', 'layout')
  return createProject
}
