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
        className="text-4xl sm:text-9xl lg:text-[160px] py-8 sm:py-16 lg:py-28 px-4 lg:px-8 min-w-[58px] lg:min-w-[170px]"
      >
        {time}
      </Button>
    </>
  )
}
