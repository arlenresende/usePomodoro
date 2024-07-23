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
    // Desabilitar o botão por 5 segundos ao montar o componente
    setIsButtonEnabled(false)
    const timer = setTimeout(() => {
      setIsButtonEnabled(true)
    }, 5000)

    // Limpar o timer ao desmontar o componente
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isActive && !isBreak ? (
        <Button
          className="w-full flex items-center justify-center gap-2 py-4 lg:py-6"
          variant="destructive"
          {...props}
          onClick={() => handleReset()}
        >
          <TimerOff size={24} />
          <span className="text-md lg:text-xl">Interromper</span>
        </Button>
      ) : (
        <Button
          className={` ${isBreak ? 'hidden' : 'flex'} w-full items-center justify-center gap-2 py-4 lg:py-6`}
          onClick={() => handleStart()}
          {...props}
          disabled={!isButtonEnabled} // Adicionar a propriedade disabled
        >
          <>
            {!isButtonEnabled ? (
              <Loader size={24} className="animate-spin" /> // Adicionar o ícone de carregamento
            ) : (
              <Play size={24} />
            )}
            <span className="text-md lg:text-xl">
              {!isButtonEnabled ? 'Carregando...' : 'Começar'}
            </span>
          </>
        </Button>
      )}

      {isBreak && (
        <Button
          className="bg-green-500 w-full flex items-center justify-center gap-2 py-4 lg:py-6"
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
