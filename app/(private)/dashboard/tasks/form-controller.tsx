'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { postDataTask } from '@/app/actions/createTask'
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
  project: z.string().min(1, { message: 'Project is required' }),
  priority: z.string().min(1, { message: 'Priority is required' }),
})

type FormData = z.infer<typeof schema>

export default function useTaskController() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<KindeUser | null>(null)
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setLoading(true)

    const newData = {
      ...data,
      projectId: data.project,
    }

    try {
      const registerProject = await postDataTask(newData, user)
      if (registerProject) {
        setLoading(false)
      }
      toast({
        title: 'Parabéns! ',
        description: ' Tarefa criada com sucesso',
        className: 'bg-green-700',
      })
      router.push('/dashboard')
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
    reset,
    setUser,
  }
}
