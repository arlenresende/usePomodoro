'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface formSubscriptionProps {
  url: string
  nameButton?: string
}

export default function FormBilling({
  url,
  nameButton,
}: formSubscriptionProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  async function handleSubmit() {
    setLoading(true)
    try {
      router.push(url)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button className="w-full" onClick={handleSubmit} disabled={loading}>
      <Check className="mr-2 h-4 w-4" /> {nameButton}
    </Button>
  )
}
