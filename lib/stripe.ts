import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_kEY as string, {
  apiVersion: '2024-04-10',
  appInfo: {
    name: 'usepomodoro',
  },
  typescript: true,
})

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string
  domainUrl: string
  customerId: string
}) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    billing_address_collection: 'auto',
    payment_method_types: ['card'],
    customer_update: {
      name: 'auto',
      address: 'auto',
    },
    success_url: `${domainUrl}/dashboard/payment/success`,
    cancel_url: `${domainUrl}/dashboard/payment/cancelled`,
  })

  return session.url as string
}
