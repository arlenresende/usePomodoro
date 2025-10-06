import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './themeProvider'
import { TimeContextProvider } from './context/timeContext'
import prisma from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Use Pomodoro',
  description:
    'Aplicação para gerenciamento de tempo e produtividade com a técnica Pomodoro',
  keywords: [
    'pomodoro',
    'produtividade',
    'gerenciamento de tempo',
    'foco',
    'concentração',
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
    title: 'Use Pomodoro',
    description:
      'Aplicação para gerenciamento de tempo e produtividade com a técnica Pomodoro',
    siteName: 'Use Pomodoro',
    locale: 'pt-BR',
    type: 'website',
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

    // Criar o usuário
    await prisma.user.create({
      data: {
        id: userId,
        email: email ?? '',
        name: name || 'Usuário',
        timePomorodo: 25,
        pausePomodoro: 5,
        urlVideo: 'https://www.youtube.com/watch?v=9hYqOQpYq6w',
      },
    })

    // Buscar novamente para pegar o colorScheme
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
        </ThemeProvider>
      </body>
    </html>
  )
}
