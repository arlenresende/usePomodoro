'use server'

import prisma from '@/lib/db'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { revalidatePath } from 'next/cache'

interface ProjectProps {
  id: string | null
  name: string
  description: string
  palletColor: string
  status: string
}

export async function editDataProject(
  dataProject: ProjectProps,
  user: KindeUser | null,
) {
  if (!user) {
    throw new Error('Not authorized')
  }

  try {
    const dataUpdate = await prisma.project.update({
      where: {
        id: dataProject.id as string,
        userId: user?.id as string,
      },
      data: {
        description: dataProject.description,
        name: dataProject.name,
        palletColor: dataProject.palletColor,
        status: dataProject.status,
      },
    })
    revalidatePath('/dashboard/projects', 'layout')

    return dataUpdate
  } catch (error) {
    console.error(error)
  }
}
