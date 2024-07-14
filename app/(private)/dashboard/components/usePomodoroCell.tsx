'use client'
import { TimeContext } from '@/app/context/timeContext'
import { Button } from '@/components/ui/button'
import { Play, Pause, TimerOff } from 'lucide-react'
import { useContext } from 'react'

interface TaskProps {
  id: string
}

export function ActionsTaskDashboard({ id }: TaskProps) {
  const { handleStart, handleReset, handlePause } = useContext(TimeContext)

  return (
    <div>
      <div className="flex items-center justify-start gap-2">
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => handleStart(id)}
        >
          <Play className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => handlePause(id)}
        >
          <Pause className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => handleReset(id)}
        >
          <TimerOff className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
