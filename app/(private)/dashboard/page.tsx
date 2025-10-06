import YouTubePlayer from '@/components/youtube-player'

import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Table from '../components/table'
import { Task } from './components/columns'

async function getData(userId: string): Promise<Task[]> {
  const data = await prisma.task.findMany({
    where: {
      userId,
      status: {
        not: 'done',
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
          palletColor: true,
        },
      },
    },
  })

  return data
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string)

  return (
    <div className=" ">
      {data && data.length > 0 ? (
        <>
          <Table data={data} />
          <YouTubePlayer isHome={false} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mt-12">
          <p className="text-center">
            You don&apos;t have any registered tasks
          </p>
          <Button asChild>
            <Link href="/dashboard/tasks">Start by creating a task</Link>
          </Button>
        </div>
      )}
      {}
    </div>
  )
}
