import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import TableProject from './components/table'
import prisma from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

async function getDataProjects(userId: string) {
  noStore()
  const projects = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Project: true,
      Subscription: {
        select: {
          status: true,
          user: {
            select: {
              stripeCustomerId: true,
            },
          },
        },
      },
    },
  })

  return projects
}

export default async function Projects() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getDataProjects(user?.id as string)

  return (
    <>
      <TableProject user={user} data={data} />
    </>
  )
}
