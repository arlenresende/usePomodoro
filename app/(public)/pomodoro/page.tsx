import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pomodoro Technique - Use Pomodoro',
  description:
    'Learn about the Pomodoro Technique, an effective time management method that uses focused work periods interspersed with short breaks to maximize concentration and mental performance.',
  keywords: [
    'pomodoro',
    'pomodoro technique',
    'productivity',
    'time management',
    'focus',
    'concentration',
  ],
  openGraph: {
    title: 'Pomodoro Technique - Use Pomodoro',
    description:
      'Learn about the Pomodoro Technique, an effective time management method to maximize your productivity and focus.',
    url: '/pomodoro',
    siteName: 'Use Pomodoro',
    locale: 'en-US',
    type: 'website',
  },
}

export default function PomodoroTechniquePage() {
  return (
    <div className="container-none mx-auto py-4 lg:py-12 px-4 lg:px-12 h-full flex items-start justify-between flex-col">
      <Header />
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 my-12">
        <h1 className="text-4xl font-bold text-center">
          The Pomodoro Technique
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What is the Pomodoro Technique?</CardTitle>
            <CardDescription>
              A time management method developed by Francesco Cirillo in the
              late 1980s.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The Pomodoro Technique is a time management method that uses
              focused work periods interspersed with short breaks to maximize
              concentration and mental performance.
            </p>
            <p>
              The name &quot;Pomodoro&quot; (tomato in Italian) comes from the
              tomato-shaped kitchen timer that Francesco Cirillo used while he
              was a university student.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How does it work?</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-4">
              <li>
                <strong>Choose a task</strong> - Select the task you want to
                accomplish.
              </li>
              <li>
                <strong>Set the timer</strong> - Traditionally for 25 minutes
                (one &quot;pomodoro&quot;).
              </li>
              <li>
                <strong>Work on the task</strong> - Focus completely until the
                timer rings.
              </li>
              <li>
                <strong>Take a short break</strong> - When the timer rings, take
                a 5-minute break.
              </li>
              <li>
                <strong>Repeat</strong> - After completing four
                &quot;pomodoros&quot;, take a longer break of 15-30 minutes.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Benefits of the Pomodoro Technique</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reduces time-related anxiety</li>
              <li>
                Increases focus and concentration by minimizing interruptions
              </li>
              <li>Improves awareness of decisions</li>
              <li>Increases motivation and keeps it constant</li>
              <li>Reinforces determination to achieve goals</li>
              <li>Improves work or study process</li>
              <li>Strengthens determination to face complex situations</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tips for using the Pomodoro Technique</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Adjust the time</strong> - Adapt the duration of
                intervals according to your needs
              </li>
              <li>
                <strong>Eliminate distractions</strong> - Turn off notifications
                and avoid interruptions during a pomodoro
              </li>
              <li>
                <strong>Use breaks correctly</strong> - Stand up, stretch, drink
                water, but avoid activities that might distract you for too long
              </li>
              <li>
                <strong>Track your progress</strong> - Monitor how many
                pomodoros you complete for each task
              </li>
              <li>
                <strong>Respect the process</strong> - Don&apos;t skip breaks,
                they are essential for mental rest
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col xl:flex-row items-center justify-center gap-4 mt-8">
          <Button asChild>
            <Link href="/">Back to Home Page</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
