'use client'
import { Pause, Play, TimerOff } from 'lucide-react'
import { Button } from '../ui/button'
import { ComponentProps, useContext } from 'react'
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

  return (
    <>
      {isActive && !isBreak ? (
        <Button
          className={`w-full flex items-center justify-center gap-2 py-4 lg:py-6`}
          variant="destructive"
          {...props}
          onClick={() => handleReset()}
        >
          <TimerOff size={24} />
          <span className="text-md lg:text-xl">Intenrronper</span>
        </Button>
      ) : (
        <Button
          className={` ${isBreak ? 'hidden' : 'flex'} w-full  items-center justify-center gap-2 py-4 lg:py-6`}
          onClick={() => handleStart()}
          {...props}
        >
          <>
            <Play size={24} />
            <span className="text-md lg:text-xl">Começar</span>
          </>
        </Button>
      )}

      {isBreak && (
        <Button
          className={`bg-green-500 w-full flex items-center justify-center gap-2 py-4 lg:py-6`}
          variant="destructive"
          disabled
        >
          <>
            <Pause size={24} />
            <span className="text-md lg:text-xl">
              Pausa de {formatTime(globalMinutes || 0)}:
              {formatTime(globalSeconds || 0)}
            </span>
          </>
        </Button>
      )}
    </>
  )
}
