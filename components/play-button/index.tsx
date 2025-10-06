'use client'
import { Pause, Play, TimerOff, Loader } from 'lucide-react'
import { Button } from '../ui/button'
import { ComponentProps, useContext, useEffect, useState } from 'react'
import { TimeContext } from '@/app/context/timeContext'

interface PlayButtonProps extends ComponentProps<'button'> {
  onClick?: () => void
}

export default function PlayButton({ ...props }: PlayButtonProps) {
  const {
    isActive,
    handleStart,
    handleReset,
    isBreak,
    formatTime,
    globalMinutes,
    globalSeconds,
  } = useContext(TimeContext)

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  useEffect(() => {
    // Disable the button for 5 seconds when mounting the component
    setIsButtonEnabled(false)
    const timer = setTimeout(() => {
      setIsButtonEnabled(true)
    }, 5000)

    // Clear the timer when unmounting the component
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isActive && !isBreak ? (
        <Button
          className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 lg:py-6"
          variant="destructive"
          {...props}
          onClick={() => handleReset()}
        >
          <TimerOff size={24} />
          <span className="text-md lg:text-xl">Stop</span>
        </Button>
      ) : (
        <Button
          className={` ${isBreak ? 'hidden' : 'flex'} w-full items-center justify-center gap-2 py-4 lg:py-6`}
          onClick={() => handleStart()}
          {...props}
          disabled={!isButtonEnabled} // Add the disabled property
        >
          <>
            {!isButtonEnabled ? (
              <Loader size={24} className="animate-spin" /> // Add the loading icon
            ) : (
              <Play size={24} />
            )}
            <span className="text-sm sm:text-md lg:text-xl">
              {!isButtonEnabled ? 'Loading...' : 'Start'}
            </span>
          </>
        </Button>
      )}

      {isBreak && (
        <Button
          className="bg-green-500 w-full flex items-center justify-center gap-2 py-3 sm:py-4 lg:py-6"
          variant="destructive"
          disabled
        >
          <>
            <Pause size={24} />
            <span className="text-sm sm:text-md lg:text-xl">
              Break of {formatTime(globalMinutes || 0)}:
              {formatTime(globalSeconds || 0)}
            </span>
          </>
        </Button>
      )}
    </>
  )
}
