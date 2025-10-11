import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './themeProvider'
import { TimeContextProvider } from './context/timeContext'
import prisma from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { AnalyticsClient } from './components/analytics-client'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Use Pomodoro - Increase your productivity',
  description:
    'Use Pomodoro is an application that helps you apply the Pomodoro technique to increase your productivity, focus, and better manage your time on daily tasks.',
  keywords: [
    'pomodoro',
    'productivity',
    'time management',
    'focus',
    'concentration',
    'tasks',
  ],
  authors: [{ name: 'Use Pomodoro Team' }],
  creator: 'Use Pomodoro',
  publisher: 'Use Pomodoro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://usepomodoro.com/'),
  openGraph: {
    title: 'Use Pomodoro - Increase your productivity',
    description:
      'Apply the Pomodoro technique to increase your productivity and focus on daily tasks.',
    siteName: 'Use Pomodoro',
    locale: 'en-US',
    type: 'website',
  },
  verification: {
    google: 'YOUR_VERIFICATION_CODE',
  },
}

async function getData(
  userId: string,
  email?: string | null | undefined,
  firstName?: string | null | undefined,
  lastName?: string | null | undefined,
) {
  noStore()

  if (!userId) return null

  let user = await prisma.user.findUnique({
    where: { id: userId },
    select: { colorScheme: true },
  })

  if (!user) {
    const name = `${firstName ?? ''} ${lastName ?? ''}`.trim()

    // Create the user
    await prisma.user.create({
      data: {
        id: userId,
        email: email ?? '',
        name: name || 'User',
        timePomorodo: 25,
        pausePomodoro: 5,
        urlVideo: 'https://www.youtube.com/watch?v=9hYqOQpYq6w',
      },
    })

    // Fetch again to get the colorScheme
    user = await prisma.user.findUnique({
      where: { id: userId },
      select: { colorScheme: true },
    })
  }

  return user
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const data = await getData(
    user?.id as string,
    user?.email,
    user?.given_name,
    user?.family_name,
  )

  return (
    <html lang="en">
      <body
        className={`xl:h-screen ${poppins.className} ${data?.colorScheme ?? 'theme-orange'}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TimeContextProvider>{children}</TimeContextProvider>
          <AnalyticsClient />
        </ThemeProvider>
      </body>
    </html>
  )
}
