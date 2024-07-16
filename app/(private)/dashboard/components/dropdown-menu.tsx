'use client'

import { Button } from '@/components/ui/button'

import { Check, Eye, Loader2, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import DeleteTaskId from './delete-task'
import { TaskProps } from '@/app/actions/createTask'
import UpdateDeleteTask from './updateCompleteTask'
import { useToast } from '@/components/ui/use-toast'
interface ModalViewProps {
  id: string | undefined
  data: TaskProps
}

export default function ModalView({ id, data }: ModalViewProps) {
  const [loading, setLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const { toast } = useToast()
  async function handleDeleteProject(id: string) {
    setLoading(true)
    try {
      await DeleteTaskId(id)
      toast({
        title: 'Parabéns! ',
        description: ' Tarefa deletada com sucesso',
        className: 'bg-red-700',
      })
      setLoading(false)
    } catch (error) {}
  }
  async function handleFinishProject(id: string, data: TaskProps) {
    setLoadingStatus(true)
    try {
      const updatedTask = {
        ...data,
        status: 'done',
      }
      await UpdateDeleteTask(updatedTask, id)
      setLoadingStatus(false)
      toast({
        title: 'Parabéns! ',
        description: ' Tarefa Finalizado com sucesso',
        className: 'bg-green-700',
      })
    } catch (error) {}
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={() => handleFinishProject(id as string, data)}
      >
        {loadingStatus ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Button>

      <Button variant="ghost" className="h-8 w-8 p-0" asChild>
        <Link href={`dashboard/tasks/${id}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="destructive"
        className="h-8 w-8 p-0"
        onClick={() => handleDeleteProject(id as string)}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
