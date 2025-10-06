'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostData } from '@/app/actions/updateUser'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

const schema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Informe seu nome'),
  email: z.string().email('Informe um Email Válido'),
  timePomorodo: z.string(),
  pausePomodoro: z.string(),
  urlVideo: z.string().url('Url inválido'),
  colorScheme: z.string(),
})

type FormData = z.infer<typeof schema>

export default function useSettingsController() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setLoading(true)
    try {
      const userUpdate = await PostData(data.id, data)
      if (userUpdate) {
        setLoading(false)
      }
      toast({
        title: 'Congratulations! ',
        description: 'Settings successfully updated',
        className: 'bg-green-700',
      })
    } catch (error) {
      toast({
        title: 'Oops! ',
        description: 'An error occurred while editing the settings',
        className: 'bg-red-700',
      })
    } finally {
      setLoading(false)
    }
  })

  return {
    handleSubmit,
    register,
    errors,
    control,
    loading,
  }
}
