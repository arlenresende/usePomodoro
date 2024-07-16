'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { postDataProject } from '@/app/actions/createProject'
import { editDataProject } from '@/app/actions/updateProject'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'

const schema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Nome obrigatório' }),
  description: z.string().min(1, { message: 'Descrição obrigatória' }),
  palletColor: z.string().min(1, { message: 'Paleta obrigatória' }),
  status: z.string().min(1, { message: 'Status obrigatório' }),
})

type FormData = z.infer<typeof schema>

export default function useProjectController() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [typeSendForm, setTypeSendForm] = useState<'create' | 'update'>(
    'create',
  )
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
    if (typeSendForm === 'create') {
      try {
        const registerProject = await postDataProject(data, user)
        if (registerProject) {
          setLoading(false)
        }
        toast({
          title: 'Parabéns! ',
          description: ' Projeto criado com sucesso',
          className: 'bg-green-700',
        })
      } catch (error) {
        toast({
          title: 'Ops',
          description: 'Não foi possiível criar o projeto',
          className: 'bg-red-700',
        })
      } finally {
        setLoading(false)
      }
    }
    if (typeSendForm === 'update') {
      try {
        const editProject = await editDataProject(data, user)
        if (editProject) {
          setLoading(false)
        }
        toast({
          title: 'Parabéns',
          description: ' Projeto editado com sucesso',
          className: 'bg-green-700',
        })
      } catch (error) {
        toast({
          title: 'Ops',
          description: 'Não foi possiível editar o projeto',
          className: 'bg-red-700',
        })
      } finally {
        setLoading(false)
      }
    }
  })

  return {
    handleSubmit,
    register,
    errors,
    control,
    loading,
    reset,
    setTypeSendForm,
    setUser,
  }
}
