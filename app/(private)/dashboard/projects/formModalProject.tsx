'use client'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/input'

import { Label } from '@radix-ui/react-label'
import { ProjectProps } from './components/table'
import useProjectController from './form-controller'
import { TextArea } from '@/components/textarea'
import { Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { HuePicker } from 'react-color'
import { Loader2 } from 'lucide-react'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
interface ModalProjectProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: ProjectProps | null
  user: KindeUser | null
}

export default function FormModalProject({
  open,
  setOpen,
  data,
  user,
}: ModalProjectProps) {
  const {
    handleSubmit,
    register,
    errors,
    control,
    reset,
    loading,
    setTypeSendForm,
    setUser,
  } = useProjectController()

  useEffect(() => {
    if (open) {
      reset({
        name: data?.name || '',
        description: data?.description || '',
        status: data?.status || 'ativo',
        palletColor: data?.palletColor || '',
      })
    }
  }, [open, data, reset])

  useEffect(() => {
    if (data?.id) {
      setTypeSendForm('update')
    } else {
      setTypeSendForm('create')
    }
  }, [data, setTypeSendForm])

  useEffect(() => {
    setUser(user)
  }, [user, setUser])
  function handleCloseModal() {
    handleSubmit()
    reset()
    setOpen(false)
  }
  return (
    <>
      <Dialog open={open} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[600px] ">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {data?.id ? 'Editar Projeto' : 'Adicionar Projeto'}
            </DialogTitle>
            <DialogDescription>
              Adicione novos projetos para seu borde em um clique.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="hidden"
                  value={(data && data?.id) || ''}
                  {...register('id')}
                  name="id"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  placeholder="Digite o nome do projeto"
                  label="Nome do Projeto"
                  {...register('name')}
                  error={errors.name?.message}
                  defaultValue={(data && data?.name) || ''}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Descrição do Projeto</Label>
                <TextArea
                  placeholder="Descrição do projeto"
                  {...register('description')}
                  error={errors.description?.message}
                  defaultValue={(data && data?.description) || ''}
                />
              </div>

              <div className="flex flex-col space-y-1.5 w-full">
                <Label>Cor de Tema</Label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={(data && data?.status) || 'ativo'}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        defaultValue={(data && data?.status) || 'ativo'}
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent className="border">
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="inativo">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    )
                  }}
                ></Controller>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Paleta do Projeto</Label>
                <Controller
                  name="palletColor"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="w-full flex flex-row items-center justify-center gap-4">
                      <Input
                        name="palletColor"
                        placeholder="Digite a paleta do projeto"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        error={errors.palletColor?.message}
                      />

                      <HuePicker
                        color={value || '#fff'}
                        onChange={(color) => onChange(color.hex)}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </form>
          <DialogFooter>
            {loading ? (
              <Button type="submit" disabled>
                <Loader2 />
              </Button>
            ) : (
              <Button onClick={handleCloseModal}>Save changes</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
