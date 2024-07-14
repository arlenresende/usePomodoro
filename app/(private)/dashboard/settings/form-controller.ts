'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostData } from '@/app/actions/updateUser'
import { useState } from 'react'

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
    } catch (error) {
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
