'use server'
import prisma from '@/lib/db'
import { getStripeSession } from '@/lib/stripe'

type createSubscriptionProps = {
  userId: string
}
export async function createSubscription({ userId }: createSubscriptionProps) {
  const dbUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeCustomerId: true,
    },
  })

  if (!dbUser?.stripeCustomerId) {
    throw new Error('Unable to get customer id')
  }

  const subscriptionUrl = await getStripeSession({
    customerId: dbUser?.stripeCustomerId,
    domainUrl: 'http://localhost:3000',
    priceId: process.env.STRIPE_API_ID as string,
  })

  return subscriptionUrl as string
}
