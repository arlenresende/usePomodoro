'use server'

import prisma from '@/lib/db'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { revalidatePath } from 'next/cache'

export interface ProjectProps {
  name: string
  description: string
  palletColor: string
  status: string
}

export async function postDataProject(
  dataProject: ProjectProps,
  user: KindeUser | null,
) {
  if (!user) {
    throw new Error('Not authorized')
  }

  const createProject = await prisma.project.create({
    data: {
      userId: user?.id as string,
      description: dataProject.description,
      name: dataProject.name,
      palletColor: dataProject.palletColor,
      status: dataProject.status,
    },
  })
  revalidatePath('/', 'layout')
  return createProject
}
