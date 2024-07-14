'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface NavigationProps {
  url: string
  icon?: ReactNode
  name: string
  disabled?: boolean
  isActive?: boolean
}
export function Navigation({
  url,
  icon,
  name,
  disabled,
  isActive,
}: NavigationProps) {
  const pathName = usePathname()
  return (
    <>
      <Link href={url}>
        <Button
          variant="ghost"
          className={`w-full flex items-center justify-start gap-2 py-6 hover:bg-accent ${pathName === url && 'bg-accent'} ${isActive && 'bg-primary'} `}
          disabled={disabled}
        >
          {icon}
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
            {name}
          </p>
        </Button>
      </Link>
    </>
  )
}
