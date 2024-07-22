'use client'
import { Badge } from '@/components/ui/badge'

import { format } from 'date-fns'
import { ActionsTaskDashboard } from '../../dashboard/components/usePomodoroCell'
import { TimeCell } from '../../dashboard/components/time-cell'
import ModalView from '../../dashboard/components/dropdown-menu'
import Pagination from '../pagination'
import { useState } from 'react'
export interface dataProjectprops {
  name: string
}

export interface Task {
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
interface TableProps {
  data: Task[]
  isCompleted?: boolean
}
export default function Table({ data, isCompleted }: TableProps) {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState<number>(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  return (
    <>
      <div className="border-l-4 border-l-primary border border-primary-foreground overflow-hidden rounded-sm">
        <div className="">
          <div className="grid grid-cols-7 items-center  p-4">
            <div className="font-semibold text-sm text-primary  col-span-2">
              Task
            </div>
            <div className="font-semibold text-sm text-primary hidden lg:block">
              Project
            </div>
            {!isCompleted && (
              <div className="font-semibold text-sm text-primary hidden lg:block">
                Status
              </div>
            )}
            {!isCompleted && (
              <div className="font-semibold text-sm text-primary hidden lg:block">
                Use Pomodoro
              </div>
            )}
            {!isCompleted && (
              <div className="font-semibold text-sm text-primary hidden lg:block">
                Time
              </div>
            )}
            {!isCompleted && (
              <div className="font-semibold text-sm text-primary hidden lg:block">
                {''}
              </div>
            )}
          </div>
        </div>
        <div className="">
          {currentData.map((task) => (
            <div
              key={task.id}
              className={`grid grid-cols-1 lg:grid-cols-7 items-start lg:items-center p-4 border-t border-muted hover:bg-muted  ${task.status === 'inProgress' && ' bg-muted '}`}
            >
              <div className="flex flex-col items-start justify-start gap-4 lg:gap-2 lg:col-span-2">
                <div className="flex gap-2 items-center justify-start w-full">
                  <span className="text-xs">
                    {format(task?.createdAt, 'dd/MM/yyyy')}
                  </span>
                  <span className="font-medium text-xs"> - </span>
                  <span
                    className={`font-bold text-xs ${task.priority === 'high' && 'text-red-500'} ${task.priority === 'medium' && 'text-yellow-500'} ${task.priority === 'low' && 'text-blue-500'}`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-start lg:items-center w-full">
                  <div>
                    <Badge variant="outline" className="bg-primary text-xs">
                      {task.type}
                    </Badge>
                  </div>
                  <span className="font-medium text-sm">{task.name}</span>
                </div>
              </div>

              <div className="font-medium text-sm ">
                <span className="">{task.project?.name}</span>
              </div>
              {!isCompleted && (
                <div className="font-medium text-sm ">{task.status}</div>
              )}
              {!isCompleted && (
                <div>
                  <ActionsTaskDashboard id={task.id} />
                </div>
              )}
              {!isCompleted && (
                <div>
                  <TimeCell id={task.id} />
                </div>
              )}
              {!isCompleted && (
                <div>
                  <ModalView id={task.id} data={task} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex items-center justify-end w-full">
        <Pagination
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}
