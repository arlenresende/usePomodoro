'use client'

import { Apple } from 'lucide-react'

import { useState } from 'react'
import { ModeToggle } from '../dark-mode'
import { ModalConfig } from '../modal-config'
import Link from 'next/link'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-center">
        <span className="text-primary text-3xl">usepomodor</span>
        <Apple
          size={22}
          className=" text-primary relative top-[-1px] left-[1px]"
        />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link href="/blog" className="text-primary text-lg">
          Blog
        </Link>
        <div className="flex items-center justify-center">
          <ModeToggle />
        </div>
      </div>

      <ModalConfig open={open} setOpen={setOpen} />
    </div>
  )
}
