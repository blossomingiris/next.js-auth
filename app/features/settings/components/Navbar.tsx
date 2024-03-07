import { getAuthUser } from '@/helpers/authUser.server'

import NavbarMenu from './NavbarMenu'
import NavigationLinksList from './NavigationLinksList'

export default async function Navbar() {
  const user = await getAuthUser()

  return (
    <nav className="bg-white flex items-center flex-col-reverse xs:flex-row px-5 py-5 sm:py-3 rounded-xl w-[95vw] justify-between shadow-sm max-w-[650px] gap-5">
      <NavigationLinksList />
      <div className="flex gap-2 items-center justify-end w-full">
        <h1 className="font-bold whitespace-nowrap">{user?.name}</h1>
        <NavbarMenu />
      </div>
    </nav>
  )
}
