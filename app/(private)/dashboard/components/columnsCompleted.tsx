'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

interface dataProjectprops {
  name: string
}

export type Task = {
  id: string
  name: string
  createdAt: Date
  type: string
  project: dataProjectprops | null
  status: string
  priority: string
  description: string
  projectId: string
}

export const columnsCompleted: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: 'Task',
    cell: ({ row }) => {
      const task = row.original
      return (
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex gap-2">
            {format(task?.createdAt, 'dd/MM/yyyy')}
            <span className="font-medium"> - </span>
            <span
              className={`font-medium ${task.priority === 'high' && 'text-red-500'} ${task.priority === 'medium' && 'text-yellow-500'} ${task.priority === 'low' && 'text-blue-500'}`}
            >
              {task.priority}
            </span>
          </div>
          <div className="flex gap-2">
            <div>
              <Badge variant="outline" className="bg-primary">
                {task.type}
              </Badge>
            </div>
            <span className="font-medium">{task.name}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'project',
    header: 'Project',
    cell: ({ row }) => {
      const task = row.original

      return task?.project?.name
    },
  },
]
