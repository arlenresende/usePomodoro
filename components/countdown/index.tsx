'use client'

import { useContext } from 'react'
import CardNumber from '../card-number'
import { TimeContext } from '@/app/context/timeContext'

export default function Countdown() {
  const { formatTime, times, globalMinutes, globalSeconds, activeId } =
    useContext(TimeContext)

  const currentMinutes = activeId
    ? times[activeId]?.minutes ?? 0
    : globalMinutes
  const currentSeconds = activeId
    ? times[activeId]?.seconds ?? 0
    : globalSeconds
  return (
    <div className="flex flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3">
      <div className="flex gap-1 sm:gap-2 items-center justify-center">
        <CardNumber time={parseInt(formatTime(currentMinutes)[0])} />
        <CardNumber time={parseInt(formatTime(currentMinutes)[1])} />
      </div>
      <span className="text-[40px] sm:text-[50px] md:text-[70px] lg:text-[140px] text-primary mx-0 font-bold">
        {' '}
        :{' '}
      </span>
      <div className="flex gap-1 sm:gap-2 items-center justify-center">
        <CardNumber time={parseInt(formatTime(currentSeconds)[0])} />
        <CardNumber time={parseInt(formatTime(currentSeconds)[1])} />
      </div>
    </div>
  )
}
