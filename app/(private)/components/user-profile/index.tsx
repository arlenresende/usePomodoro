import { LogOut, Mail, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
export async function UserProfile() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <Avatar>
            <AvatarImage src={user?.picture || ''} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>
              {user?.given_name} {user?.family_name}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>{user?.email}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink className="w-full">
            <Button variant="ghost" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
