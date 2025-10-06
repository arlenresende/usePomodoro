import { HTMLAttributes } from 'react'
import { Button } from '../ui/button'

interface CardNumberProps extends HTMLAttributes<HTMLButtonElement> {
  time: number
}
export default function CardNumber({ time }: CardNumberProps) {
  return (
    <>
      <Button
        variant="outline"
        className="text-5xl sm:text-7xl md:text-9xl lg:text-[160px] py-4 sm:py-8 md:py-16 lg:py-28 px-1 sm:px-3 lg:px-8 min-w-[70px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[170px]"
      >
        {time}
      </Button>
    </>
  )
}
