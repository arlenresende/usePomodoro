'use client'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/input'
import { Label } from '@radix-ui/react-dropdown-menu'

import { Controller } from 'react-hook-form'
import useSettingsController from './form-controller'
import { Loader2 } from 'lucide-react'

interface DataProps {
  name: string | null
  email: string
  timePomorodo: number
  pausePomodoro: number
  urlVideo: string
  colorScheme: string
}

interface FormSettingsProps {
  data: DataProps | null
  userId: string | null
}

export default function FormSettings({ data, userId }: FormSettingsProps) {
  const { handleSubmit, register, errors, control, loading } =
    useSettingsController()

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col xl:flex-row items-start gap-2 w-full">
              <div className="flex flex-col space-y-1.5 w-full">
                <Input
                  type="hidden"
                  value={userId || ''}
                  {...register('id')}
                  name="id"
                />
                <Input
                  placeholder="Nome"
                  label="Seu nome"
                  {...register('name')}
                  error={errors.name?.message}
                  defaultValue={(data && data?.name) || ''}
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Input
                  placeholder="Email"
                  label="Seu Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  defaultValue={(data && data?.email) || ''}
                />
              </div>
            </div>
            <div className="flex flex-col xl:flex-row  items-start gap-2 w-full">
              <div className="flex flex-col space-y-1.5 w-full">
                <Input
                  placeholder="25:00"
                  label="Tempo do Pomodoro"
                  {...register('timePomorodo')}
                  type="number"
                  defaultValue={(data && data?.timePomorodo) || ''}
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Input
                  placeholder="05:00"
                  label="Tempo de Pausa "
                  {...register('pausePomodoro')}
                  type="number"
                  defaultValue={(data && data?.pausePomodoro) || ''}
                />
              </div>
            </div>

            <div className="flex flex-col xl:flex-row  items-start gap-2 w-full">
              <div className="flex flex-col space-y-1.5 w-full">
                <Input
                  placeholder="Url do video do YouTube"
                  label="Url do video do YouTube"
                  {...register('urlVideo')}
                  error={errors.urlVideo?.message}
                  defaultValue={(data && data?.urlVideo) || ''}
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Label>Cor de Tema</Label>
                <Controller
                  name="colorScheme"
                  control={control}
                  defaultValue={(data && data?.colorScheme) || 'theme-orange'}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        defaultValue={
                          (data && data?.colorScheme) || 'theme-orange'
                        }
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent className="border">
                          <SelectItem value="theme-green">Green</SelectItem>
                          <SelectItem value="theme-blue">Blue</SelectItem>
                          <SelectItem value="theme-violet">Violet</SelectItem>
                          <SelectItem value="theme-yellow">Yellow</SelectItem>
                          <SelectItem value="theme-orange">Orange</SelectItem>
                          <SelectItem value="theme-red">Red</SelectItem>
                          <SelectItem value="theme-rose">Rose</SelectItem>
                        </SelectContent>
                      </Select>
                    )
                  }}
                ></Controller>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {loading ? (
            <Button type="submit" disabled>
              <Loader2 />
            </Button>
          ) : (
            <Button type="submit">Salvar</Button>
          )}
        </CardFooter>
      </form>
    </div>
  )
}
