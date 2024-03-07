'use client'

import { useAuthUser } from '@/hooks/useAuthUser'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import LogoutButton from '@/components/ui/LogoutButton'

export default function NavbarMenu() {
  const user = useAuthUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <MdLogout className="mr-2" size={22} /> Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
