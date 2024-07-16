'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { useRouter } from 'next/navigation'
import { updateDataTask } from '@/app/actions/updateTask'

const schema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Nome obrigatório' }),
  description: z.string().min(1, { message: 'Descrição obrigatória' }),
  type: z.string().min(1, { message: 'Tipo obrigatória' }),
  status: z.string().min(1, { message: 'Status obrigatório' }),
  project: z.string().min(1, { message: 'Projeto obrigatório' }),
  priority: z.string().min(1, { message: 'Prioridade obrigatória' }),
})

type FormData = z.infer<typeof schema>

export default function useTaskController() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
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
      const registerProject = await updateDataTask(newData, user)
      if (registerProject) {
        setLoading(false)
      }
      toast({
        title: 'Parabéns! ',
        description: ' Tarefa editada com sucesso',
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
