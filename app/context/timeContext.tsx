'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'

interface TimeContextType {
  handleStart: (id?: string) => void
  handleReset: (id?: string) => void
  handlePause: (id?: string) => void
  formatTime: (time: number) => string
  times: { [key: string]: { minutes: number; seconds: number } }
  globalMinutes: number
  globalSeconds: number
  isActive: boolean
  isBreak: boolean
  activePlay: boolean
  activeId: string | null
}

export const TimeContext = createContext({} as TimeContextType)

interface TimeContextProviderProps {
  children: ReactNode
}

export function TimeContextProvider({ children }: TimeContextProviderProps) {
  const [times, setTimes] = useState<{
    [key: string]: { minutes: number; seconds: number }
  }>({})
  const [globalMinutes, setGlobalMinutes] = useState(25)
  const [globalSeconds, setGlobalSeconds] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [activePlay, setActivePlay] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isActive) {
      timer = setInterval(() => {
        if (activeId) {
          setTimes((prevTimes) => {
            const currentTime = prevTimes[activeId]
            let { minutes, seconds } = currentTime || {
              minutes: 0,
              seconds: 10,
            }

            if (seconds > 0) {
              seconds -= 1
            } else if (minutes > 0) {
              minutes -= 1
              seconds = 59
            } else {
              if (!isBreak) {
                minutes = 5
                seconds = 0
                setIsBreak(true)
              } else {
                minutes = 25
                seconds = 0
                setIsBreak(false)
              }
            }

            return { ...prevTimes, [activeId]: { minutes, seconds } }
          })
        } else {
          if (globalSeconds > 0) {
            setGlobalSeconds(globalSeconds - 1)
          } else if (globalMinutes > 0) {
            setGlobalMinutes(globalMinutes - 1)
            setGlobalSeconds(59)
          } else {
            if (!isBreak) {
              setGlobalMinutes(5)
              setGlobalSeconds(0)
              setIsBreak(true)
            } else {
              setGlobalMinutes(25)
              setGlobalSeconds(0)
              setIsBreak(false)
            }
          }
        }
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isActive, isBreak, activeId, globalSeconds, globalMinutes])

  const formatTime = (time: number): string => {
    return time < 10 ? `0${time}` : `${time}`
  }

  const handleStart = (id?: string) => {
    setIsActive(true)
    setActivePlay(true)
    if (id) {
      setActiveId(id)
      setTimes((prevTimes) => ({
        ...prevTimes,
        [id]: prevTimes[id] || { minutes: 25, seconds: 0 },
      }))
    } else {
      setActiveId(null)
    }
  }

  const handlePause = (id?: string) => {
    if (!id || id === activeId) {
      setIsActive(false)
      setActivePlay(false)
    }
  }

  const handleReset = (id?: string) => {
    if (!id || id === activeId) {
      setIsActive(false)
      setActivePlay(false)
      setIsBreak(false)
      if (id) {
        setTimes((prevTimes) => ({
          ...prevTimes,
          [id]: { minutes: 25, seconds: 0 },
        }))
      } else {
        setGlobalMinutes(25)
        setGlobalSeconds(0)
      }
      if (!id) setActiveId(null)
    }
  }

  return (
    <TimeContext.Provider
      value={{
        handlePause,
        handleStart,
        handleReset,
        formatTime,
        times,
        globalMinutes,
        globalSeconds,
        isActive,
        isBreak,
        activePlay,
        activeId,
      }}
    >
      {children}
    </TimeContext.Provider>
  )
}
