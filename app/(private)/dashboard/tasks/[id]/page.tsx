import prisma from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import FormEditTask from './form-edit-task'

async function getDataProjects(userId: string) {
  noStore()
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
    select: {
      name: true,
      id: true,
    },
  })

  return projects
}

async function getData({ userId, taskId }: { userId: string; taskId: string }) {
  noStore()
  const data = await prisma.task.findUnique({
    where: {
      id: taskId,
      userId,
    },
    select: {
      name: true,
      description: true,
      status: true,
      type: true,
      id: true,
      createdAt: true,
      priority: true,
      project: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  })

  return data
}

export default async function SinglePageTask({
  params,
}: {
  params: { id: string }
}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData({ userId: user?.id as string, taskId: params.id })
  const dataProject = await getDataProjects(user?.id as string)

  return (
    <Card className="w-full max-w-[80%]">
      <CardHeader>
        <CardTitle>{`${params.id ? 'Editar' : 'Criar'} Tarefa`}</CardTitle>
        <CardDescription>
          Edite novas configurações para seu dashboard em um clique.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormEditTask dataProject={dataProject} user={user} data={data} />
      </CardContent>
    </Card>
  )
}
