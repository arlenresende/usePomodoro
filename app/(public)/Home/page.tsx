import Countdown from '@/components/countdown'
import Footer from '@/components/footer'
import Header from '@/components/header'
import PlayButton from '@/components/play-button'
import { Button } from '@/components/ui/button'

import YouTubeAudioPlayer from '@/components/youtube-player'

import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title:
    'Use Pomodoro - Increase your productivity with the Pomodoro technique',
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
  openGraph: {
    title: 'Use Pomodoro - Increase your productivity',
    description:
      'Apply the Pomodoro technique to increase your productivity and focus on daily tasks.',
    url: '/',
    siteName: 'Use Pomodoro',
    locale: 'en-US',
    type: 'website',
  },
}

export default async function HomePage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <div className="container-none mx-auto py-4 lg:py-12 px-4 lg:px-12 min-h-screen flex flex-col">
      <Header />
      <div className="w-full mx-auto flex flex-col gap-4 sm:gap-6 lg:gap-8 flex-1 flex items-center justify-center my-4">
        <div className="w-full max-w-md mx-auto">
          <Countdown />
        </div>
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-2 sm:gap-3 md:gap-4">
          <PlayButton />
          <div className="flex items-center justify-center gap-4">
            <YouTubeAudioPlayer isHome />
          </div>
          <div className="flex items-center justify-center mt-2 sm:mt-4">
            <Button
              asChild
              variant="outline"
              className="text-xs sm:text-sm lg:text-base py-2 sm:py-3 px-3 sm:px-4"
            >
              <Link href="/pomodoro">
                Learn more about the Pomodoro Technique
              </Link>
            </Button>
          </div>
        </div>

        {user ? (
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
            <div className="flex flex-row gap-2 items-center justify-center">
              <Button
                asChild
                className="text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4"
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
            <div className="flex flex-row gap-2 items-center justify-center flex-wrap">
              <RegisterLink>
                <Button className="text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4">
                  Create an account
                </Button>
              </RegisterLink>
              <span className="text-xs sm:text-sm">or</span>
              <LoginLink>
                <Button className="text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4">
                  Login
                </Button>
              </LoginLink>
            </div>
            <span className="text-xs sm:text-sm">to add tasks</span>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
