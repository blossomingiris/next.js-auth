'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { routePaths } from '@/routes/routes'

import { cn } from '@/lib/utils'

const links = [
  {
    label: 'My Profile',
    href: routePaths.profile,
  },
  {
    label: 'Admin',
    href: routePaths.admin,
  },
  {
    label: 'Settings',
    href: routePaths.settings,
  },
] as const

export default function NavigationLinksList() {
  const pathname = usePathname()

  return (
    <ul className="flex justify-evenly sm:justify-between gap-2 w-full sm:max-w-[280px]">
      {links.map(({ label, href }) => (
        <li key={label} className="relative">
          <Link
            className={cn(
              'px-2 sm:px-3 py-2 hover:bg-muted rounded-md whitespace-nowrap transition-colors duration-200',
              { 'bg-sky-300 hover:bg-sky-400': pathname === href },
            )}
            href={href}
          >
            {label}
          </Link>
          <span className="bg-sky-300 px-2 sm:px-3 py-2 inset-0 -z-10 absolute"></span>
        </li>
      ))}
    </ul>
  )
}
