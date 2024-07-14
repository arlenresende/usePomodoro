import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import FormTask from './form-task'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

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

export default async function Tasks() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const dataProject = await getDataProjects(user?.id as string)
  return (
    <Card className="w-full xl:max-w-[80%]">
      <CardHeader>
        <CardTitle>Criar Tarefa</CardTitle>
        <CardDescription>
          Adicone novas tarefas para seu borde em um clique.
        </CardDescription>
      </CardHeader>
      <FormTask user={user} data={dataProject} />
    </Card>
  )
}
