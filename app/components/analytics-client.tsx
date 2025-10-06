'use client'

import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next'

export function AnalyticsClient() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        if (event.url.includes('/dashboard')) {
          return null
        }
        return event
      }}
    />
  )
}
