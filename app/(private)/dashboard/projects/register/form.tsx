'use client'
import { Input } from '@/components/input'
import { Label } from '@radix-ui/react-label'
import { TextArea } from '@/components/textarea'
import { Controller } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { BlockPicker } from 'react-color'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import useProjectController from '../form-controller'
import { useEffect } from 'react'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'

interface ProjectProps {
  id: string
  name: string
  description: string
  palletColor: string
  status: string
}

interface RegisterProjectProps {
  data: ProjectProps | null
  user: KindeUser | null
}

export default function FormRegisterProject({
  data,
  user,
}: RegisterProjectProps) {
  const { handleSubmit, register, errors, control, reset, loading, setUser } =
    useProjectController()

  useEffect(() => {
    setUser(user)
  }, [user, setUser])

  function handleCreateProject() {
    handleSubmit()
    reset()
  }

  return (
    <form className="px-6 pb-6">
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
            placeholder="Enter project name"
            label="Project Name"
            {...register('name')}
            error={errors.name?.message}
            defaultValue={(data && data?.name) || ''}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <TextArea
            label="Project Description"
            placeholder="Project description"
            {...register('description')}
            error={errors.description?.message}
            defaultValue={(data && data?.description) || ''}
          />
        </div>

        <div className="flex flex-col space-y-1.5 w-full">
          <Label>Theme Color</Label>
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
                    <SelectItem value="ativo">Active</SelectItem>
                    <SelectItem value="inativo">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Project Color Palette</Label>
          <Controller
            name="palletColor"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="w-full flex-col xl:flex-row items-start justify-start gap-4">
                <Input
                  name="palletColor"
                  placeholder="Enter project color palette"
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  error={errors.palletColor?.message}
                />

                <BlockPicker
                  color={value || '#fff'}
                  onChange={(color) => onChange(color.hex)}
                  triangle="hide"
                  className="mt-6"
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex justify-end">
        {' '}
        {loading ? (
          <Button type="submit" disabled>
            <Loader2 />
          </Button>
        ) : (
          <Button onClick={() => handleCreateProject()}>Save changes</Button>
        )}
      </div>
    </form>
  )
}
