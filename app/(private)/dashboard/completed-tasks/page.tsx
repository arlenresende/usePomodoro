import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { DataTable } from '../components/data-table'
import { Task } from '../components/columns'
import { columnsCompleted } from '../components/columnsCompleted'

async function getData(userId: string): Promise<Task[]> {
  const data = await prisma.task.findMany({
    where: {
      userId,
      status: {
        equals: 'done',
      },
    },
    select: {
      name: true,
      description: true,
      status: true,
      id: true,
      projectId: true,
      userId: true,
      createdAt: true,
      priority: true,
      type: true,
      project: {
        select: {
          name: true,
        },
      },
    },
  })

  return data
}

export default async function CompletedTasks() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string)
  return (
    <div className=" ">
      {data && data.length > 0 && (
        <>
          <DataTable
            columns={columnsCompleted}
            data={data}
            isCompleted={true}
          />
        </>
      )}
      {}
    </div>
  )
}
