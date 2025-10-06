import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { Task } from '../components/columns'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Table from '../../components/table'

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
      {data && data.length > 0 ? (
        <>
          <Table data={data} isCompleted />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mt-12">
          <p className="text-center">You don&apos;t have any completed tasks</p>
          <Button asChild>
            <Link href="/dashboard/tasks">Start by creating a task</Link>
          </Button>
        </div>
      )}
      {}
    </div>
  )
}
