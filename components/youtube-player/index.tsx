'use client'

import { Volume, VolumeX } from 'lucide-react'

import React, { useContext, useEffect, useRef, useState } from 'react'
import YouTube, {
  YouTubeProps,
  YouTubePlayer as YouTubePlayerType,
} from 'react-youtube'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { TimeContext } from '@/app/context/timeContext'

interface Props {
  isHome: boolean
}

export default function YouTubePlayer({ isHome }: Props) {
  const [videoId, setVideoId] = useState<string | null>('4ifP3Fd8vJk')
  const playerRef = useRef<YouTubePlayerType | null>(null)
  const { isActive, isBreak, activePlay } = useContext(TimeContext)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const extractVideoId = (url: string): string | null => {
    const regex =
      // eslint-disable-next-line no-useless-escape
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value
    const id = extractVideoId(url)
    setVideoId(id)
  }

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target
  }

  useEffect(() => {
    if (isActive && !isBreak && playerRef.current && videoId) {
      playerRef.current.playVideo()
    }
    if (isActive && isBreak && playerRef.current && videoId) {
      playerRef.current.pauseVideo()
    }
    if (!isActive && isBreak && playerRef.current && videoId) {
      playerRef.current.pauseVideo()
    }
    if (!activePlay && playerRef.current) {
      playerRef.current.pauseVideo()
    }
  }, [isActive, videoId, isBreak, activePlay])

  const handleMute = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo()
      setIsPlaying(false)
    }
  }

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.playVideo()
      setIsPlaying(true)
    }
  }

  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      origin: process.env.KINDE_SITE_URL,
    },
  }

  useEffect(() => {
    setIsButtonEnabled(false)
    const timer = setTimeout(() => {
      setIsButtonEnabled(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="w-full">
      {isHome && (
        <>
          <div className="flex gap-4 items-center justify-center">
            <Input
              placeholder="Link do Vídeo do Youtube"
              className="py-5 lg:py-6 text-sm lg:text-base"
              onChange={handleInputChange}
            />
            {isPlaying ? (
              <Button disabled={!isButtonEnabled}>
                <VolumeX
                  size={24}
                  className="text-white"
                  onClick={handleMute}
                />
              </Button>
            ) : (
              <Button disabled={!isButtonEnabled}>
                <Volume size={24} className="text-white" onClick={handlePlay} />
              </Button>
            )}
          </div>
        </>
      )}
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          style={{ display: 'none' }}
        />
      )}
    </div>
  )
}
