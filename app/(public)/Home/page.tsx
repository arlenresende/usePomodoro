import Countdown from '@/components/countdown'
import Footer from '@/components/footer'
import Header from '@/components/header'
import PlayButton from '@/components/play-button'
import { Button } from '@/components/ui/button'

import YouTubeAudioPlayer from '@/components/youtube-player'

import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components'

export default function HomePage() {
  return (
    <div className="container-none mx-auto py-4 lg:py-12 px-4 lg:px-12 h-full flex items-start justify-between flex-col">
      <Header />
      <div className=" mx-auto flex flex-col gap-8">
        <div className="  mx-auto w-full flex items-end justify-end  "></div>
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-6 items-center justify-center w-auto">
          <Countdown />
        </div>
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          <PlayButton />
          <div className="flex items-center justify-center gap-4">
            <YouTubeAudioPlayer isHome />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row items-center justify-center gap-4">
          <div className="flex flex-row gap-2 items-center justify-center">
            <RegisterLink>
              <Button>Crie uma conta</Button>
            </RegisterLink>
            <span>ou</span>
            <LoginLink>
              <Button>Faça Login</Button>
            </LoginLink>
          </div>
          <span>para poder adicionar tarefas</span>
        </div>
      </div>
      <Footer />
    </div>
  )
}
