import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import FormRegisterProject from './form'
import prisma from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

function getDataProject(userId: string) {
  noStore()
  const data = prisma.project.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      palletColor: true,
      status: true,
    },
  })

  return data
}

export default async function RegisterProject() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getDataProject(user?.id as string)

  return (
    <>
      <div>
        <Card className="w-full xl:max-w-[80%]">
          <CardHeader>
            <CardTitle>Criar projetos</CardTitle>
            <CardDescription>
              Adicione novos projetos para seu borde em um clique.
            </CardDescription>
          </CardHeader>
        </Card>
        <FormRegisterProject data={data} user={user} />
      </div>
    </>
  )
}
