'use client'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Loader2, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import FormModalProject from '../formModalProject'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { deleteDataProject } from '@/app/actions/deleteProject'
import Link from 'next/link'

export interface ProjectProps {
  id: string
  name: string
  description: string
  palletColor: string
  status: string
}
export interface SubscriptionProps {
  status: string
}
export interface DataProjectProps {
  data: {
    Project: ProjectProps[]
    Subscription: SubscriptionProps | null
  } | null
  user: KindeUser | null
}

export default function TableProject({ data, user }: DataProjectProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataModal, setDataModal] = useState<ProjectProps | null>(null)

  function handleModalProject(id?: string) {
    setOpen(true)
    const selectedProject = id
      ? data && data.Project.find((project) => project.id === id)
      : null
    setDataModal(selectedProject || null)
  }

  async function handleDeleteProject(id: string, user: KindeUser | null) {
    setLoading(true)
    try {
      await deleteDataProject(id, user)
      setLoading(false)
    } catch (error) {}
  }

  return (
    <>
      <Table className="w-full  border border-l-4 border-l-primary">
        <TableCaption>Projetos Cadastrados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>

            <TableHead>Status</TableHead>
            <TableHead>Paleta</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.Project.length > 0 &&
            data.Project.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <span
                    className={`w-10 h-10 bg-primary rounded p-2`}
                    style={{ backgroundColor: project?.palletColor }}
                  >
                    {project.palletColor}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 w-full items-center justify-end">
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleModalProject(project.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDeleteProject(project.id, user)}
                      disabled={loading || data.Project.length === 1}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end w-full mt-4">
        {data?.Subscription?.status !== 'active' ? (
          <div className="flex gap-2 items-center justify-end">
            <p className="text-base text-foreground">
              Crie projetos ilimitados agora!
            </p>
            <Button className="" asChild>
              <Link href="/dashboard/billing">Sejá Pro!</Link>
            </Button>
          </div>
        ) : (
          <Button className="" onClick={() => handleModalProject()}>
            Cadastrar novo Projeto
          </Button>
        )}
      </div>
      <FormModalProject
        open={open}
        setOpen={setOpen}
        data={dataModal}
        user={user}
      />
    </>
  )
}
