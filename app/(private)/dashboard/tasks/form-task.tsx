'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { CardContent, CardFooter } from '@/components/ui/card'

import { Input } from '@/components/input'

import { Label } from '@radix-ui/react-label'
import { Controller } from 'react-hook-form'

import useTaskController from './form-controller'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Button } from '@/components/ui/button'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface dataProjectprops {
  id: string
  name: string
}
interface ModalTaskProps {
  user: KindeUser | null
  data: dataProjectprops[] | null
}
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
]

export default function FormTask({ user, data }: ModalTaskProps) {
  const { handleSubmit, register, errors, control, loading, setUser } =
    useTaskController()

  useEffect(() => {
    setUser(user)
  }, [user, setUser])

  return (
    <>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Digite o nome da tarefa"
                label="Nome da tarefa"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Descrição doa tarefa</Label>

              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <ReactQuill
                      {...field}
                      modules={modules}
                      formats={formats}
                      className="min-h-40 max-h-40 overflow-auto w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.description && (
                      <span className="text-red-600 text-sm mt-1">
                        {errors.description.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
              <div className="w-full gap-4 flex flex-col lg:flex-row">
                <div className="w-full">
                  <Label>Projeto</Label>
                  <Controller
                    name="project"
                    control={control}
                    defaultValue={(data && data[0]?.id) || 'default'}
                    render={({
                      field: { name, onChange, value, disabled },
                    }) => {
                      return (
                        <Select
                          defaultValue={(data && data[0]?.id) || 'default'}
                          name={name}
                          onValueChange={onChange}
                          value={value}
                          disabled={disabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="default" />
                          </SelectTrigger>
                          <SelectContent className="border">
                            {data &&
                              data.length > 0 &&
                              data.map((value) => (
                                <SelectItem key={value.id} value={value.id}>
                                  {value.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      )
                    }}
                  ></Controller>
                </div>
                <div className="w-full">
                  <Label>Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={'todo'}
                    render={({
                      field: { name, onChange, value, disabled },
                    }) => {
                      return (
                        <Select
                          defaultValue={'todo'}
                          name={name}
                          onValueChange={onChange}
                          value={value}
                          disabled={disabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent className="border">
                            <SelectItem value="inProgress">
                              Em Progresso
                            </SelectItem>
                            <SelectItem value="blocked">Bloqueado</SelectItem>
                            <SelectItem value="paused">Pausado</SelectItem>
                            <SelectItem value="todo">Para fazer</SelectItem>
                            <SelectItem value="paused">Pausado</SelectItem>
                            <SelectItem value="done">Finalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      )
                    }}
                  ></Controller>
                </div>
                <div className="w-full">
                  <Label>Tipo</Label>
                  <Controller
                    name="type"
                    control={control}
                    defaultValue={'feature'}
                    render={({
                      field: { name, onChange, value, disabled },
                    }) => {
                      return (
                        <Select
                          defaultValue={'feature'}
                          name={name}
                          onValueChange={onChange}
                          value={value}
                          disabled={disabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                          <SelectContent className="border">
                            <SelectItem value="feature">Feature</SelectItem>
                            <SelectItem value="bug">Bug</SelectItem>
                            <SelectItem value="Incident">Incidente</SelectItem>
                            <SelectItem value="enhancement">
                              Melhoria
                            </SelectItem>
                            <SelectItem value="spike">Spike</SelectItem>
                            <SelectItem value="maintenance">
                              Manutenção
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )
                    }}
                  ></Controller>
                </div>
                <div className="w-full">
                  <Label>Prioridade</Label>
                  <Controller
                    name="priority"
                    control={control}
                    defaultValue={'medium'}
                    render={({
                      field: { name, onChange, value, disabled },
                    }) => {
                      return (
                        <Select
                          defaultValue={'medium'}
                          name={name}
                          onValueChange={onChange}
                          value={value}
                          disabled={disabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Prioridade" />
                          </SelectTrigger>
                          <SelectContent className="border">
                            <SelectItem value="high">Alta</SelectItem>
                            <SelectItem value="medium">Média</SelectItem>
                            <SelectItem value="low">Baixa</SelectItem>
                          </SelectContent>
                        </Select>
                      )
                    }}
                  ></Controller>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        {loading ? (
          <Button>
            <Loader2 className=" h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Salvar</Button>
        )}
      </CardFooter>
    </>
  )
}
