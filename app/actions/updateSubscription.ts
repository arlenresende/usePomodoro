'use server'

import prisma from '@/lib/db'
import { stripe } from '@/lib/stripe'
import process from 'process'

type editSubscriptionProps = {
  userId: string
}

export async function updateSubscription({ userId }: editSubscriptionProps) {
  const dbUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeCustomerId: true,
    },
  })

  if (!dbUser?.stripeCustomerId) {
    throw new Error('Stripe customer id not found')
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: dbUser.stripeCustomerId,
    return_url:
      process.env.NODE_ENV === 'production'
        ? (process.env.PRODUCTION_URL as string)
        : 'http://localhost:3000/dashboard',
  })
  return session.url as string
}
