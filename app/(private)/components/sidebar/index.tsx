import {
  Apple,
  FolderOpen,
  Home,
  ListChecks,
  ListTodo,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { Navigation } from '../navigation'
import { Button } from '@/components/ui/button'

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

export default function SidebarDashboard() {
  return (
    <>
      <aside className="hidden xl:block translate-x-80 fixed  inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 ">
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex flex-col space-y-4">
            <Link className="py-6  text-center" href="/dashboard">
              <div className="flex items-center justify-center">
                <span className="text-primary text-3xl">usepomodor</span>
                <Apple
                  size={22}
                  className=" text-primary relative top-[-1px] left-[1px]"
                />
              </div>
            </Link>

            <div className="m-4">
              <div className="mb-4 flex flex-col gap-1">
                <Navigation url="/dashboard" icon={<Home />} name="Dashboard" />
                <Navigation
                  url="/dashboard/tasks"
                  icon={<ListTodo />}
                  name="Tarefas"
                />
                <Navigation
                  url="/dashboard/completed-tasks"
                  icon={<ListChecks />}
                  name="Tarefas Finalizadas"
                />
                <Navigation
                  url="/dashboard/projects"
                  icon={<FolderOpen />}
                  name="Projetos"
                />
                <Navigation
                  url="/dashboard/settings"
                  icon={<Settings />}
                  name="Configurações"
                />
                {/* <Navigation
                  url="/dashboard/billing"
                  icon={<Wallet />}
                  name="Seja Pró"
                  isActive
                /> */}
              </div>
            </div>
            <div></div>
          </div>
          <LogoutLink>
            <Button className="w-full">Logout</Button>
          </LogoutLink>
        </div>
      </aside>
    </>
  )
}
