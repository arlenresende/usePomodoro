import { ModeToggle } from '@/components/dark-mode'

import BreadcrumbDashnoard from '../breadcrumb'
import { UserProfile } from '../user-profile'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Navigation } from '../navigation'
import {
  Apple,
  FolderOpen,
  Home,
  ListChecksIcon,
  MenuIcon,
  Settings,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'

export default function HeaderDashboard() {
  return (
    <>
      <nav className="block w-full max-w-full bg-transparent shadow-none rounded-xl transition-all px-0 py-1">
        <div className="flex flex-col-reverse justify-between gap-6  xl:flex-row  xl:items-center">
          <div className="capitalize">
            <h2 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
              DashBoard
            </h2>
            <BreadcrumbDashnoard />
          </div>
          <div className="flex items-center gap-1">
            <div className="block xl:hidden">
              <Link className="  text-center" href="/dashboard">
                <div className="flex items-center justify-center">
                  <span className="text-primary text-xl">usepomodor</span>
                  <Apple
                    size={16}
                    className=" text-primary relative top-[-1px] left-[1px]"
                  />
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-1 xl:gap-4 w-full justify-end">
              <div className="block xl:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MenuIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Navigation
                      url="/dashboard"
                      icon={<Home />}
                      name="Dashboard"
                    />
                    <Navigation
                      url="/dashboard/tasks"
                      icon={<ListChecksIcon />}
                      name="Tarefas"
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
                    <Navigation
                      url="/dashboard/billing"
                      icon={<Wallet />}
                      name="Seja Pró"
                      isActive
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <UserProfile />

              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
