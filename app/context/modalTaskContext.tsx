'use client'

import { createContext, ReactNode, useState } from 'react'

interface ModalTaskContextType {
  setOpenModalTask: (open: boolean) => void
  openModalTask: boolean
  handleOpenModalTask: (id: string) => void
  handleCloseModalTask: () => void
  selectedTaskId: string | null
}

export const ModalTaskContext = createContext({} as ModalTaskContextType)

interface ModalTaskContextProviderProps {
  children: ReactNode
}

export function ModalTaskContextProvider({
  children,
}: ModalTaskContextProviderProps) {
  const [openModalTask, setOpenModalTask] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const handleOpenModalTask = (id: string) => {
    setOpenModalTask(true)
    setSelectedTaskId(id)
  }

  const handleCloseModalTask = () => {
    setOpenModalTask(false)
    setSelectedTaskId(null)
  }

  return (
    <ModalTaskContext.Provider
      value={{
        setOpenModalTask,
        openModalTask,
        handleCloseModalTask,
        handleOpenModalTask,
        selectedTaskId,
      }}
    >
      {children}
    </ModalTaskContext.Provider>
  )
}
