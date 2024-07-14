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
    <>
      <div className="flex gap-2 items-center justify-center">
        <CardNumber time={parseInt(formatTime(currentMinutes)[0])} />
        <CardNumber time={parseInt(formatTime(currentMinutes)[1])} />
      </div>
      <span className="text-[50px] lg:text-[140px] text-primary"> : </span>
      <div className="flex gap-2 items-center justify-center">
        <CardNumber time={parseInt(formatTime(currentSeconds)[0])} />
        <CardNumber time={parseInt(formatTime(currentSeconds)[1])} />
      </div>
    </>
  )
}
