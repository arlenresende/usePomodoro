'use server'

import prisma from '@/lib/db'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { revalidatePath } from 'next/cache'

export async function deleteDataProject(id: string, user: KindeUser | null) {
  if (!user) {
    throw new Error('Not authorized')
  }

  const createProject = await prisma.project.delete({
    where: {
      id,
    },
  })
  revalidatePath('/', 'layout')
  return createProject
}
