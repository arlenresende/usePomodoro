'use client'
import { TimeContext } from '@/app/context/timeContext'

import { useContext } from 'react'

interface TimeProps {
  id: string
}

export function TimeCell({ id }: TimeProps) {
  const { times, formatTime } = useContext(TimeContext)

  return (
    <div>
      <div className="flex items-center justify-start gap-2">
        <span className="text-primary">
          {formatTime(times[id]?.minutes || 0)}:
          {formatTime(times[id]?.seconds || 0)}
        </span>
      </div>
    </div>
  )
}
