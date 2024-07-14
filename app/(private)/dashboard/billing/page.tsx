import { BellRing } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { unstable_noStore as noStore } from 'next/cache'
import { createSubscription } from '@/app/actions/createSubscription'
import FormBilling from './form'
import prisma from '@/lib/db'
import { updateSubscription } from '@/app/actions/updateSubscription'

async function getData(userId: string) {
  noStore()
  const data = await prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  })

  return data
}

export default async function Billing() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string)

  const subscriptionUrl = await createSubscription({
    userId: user?.id as string,
  })

  const editSubscriptionUrl = await updateSubscription({
    userId: user?.id as string,
  })

  return (
    <>
      {data?.status === 'active' ? (
        <Card className={cn('w-full xl:max-w-[80%]')}>
          <CardHeader>
            <CardTitle className="flex justify-start items-baseline w-full">
              <span className="text-xl xl:text-6xl ">Assinatura</span>
            </CardTitle>
            <CardDescription>
              Veja os dados de sua assinatura! Edite, Cancele ou mude de planos
              em apenas um clique
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <FormBilling
              url={editSubscriptionUrl}
              nameButton="Ver detalhes da assinatura"
            />
          </CardFooter>
        </Card>
      ) : (
        <Card className={cn('w-full xl:max-w-[80%]')}>
          <CardHeader>
            <CardTitle className="flex justify-start items-baseline w-full">
              <span className="text-6xl ">R$9,90</span>
              <span className="text-2xl text-muted-foreground">/mês</span>
            </CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to device.
                </p>
              </div>
            </div>
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to device.
                </p>
              </div>
            </div>
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to device.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <FormBilling
              url={subscriptionUrl}
              nameButton="Quero fazer a assinatura"
            />
          </CardFooter>
        </Card>
      )}
    </>
  )
}
