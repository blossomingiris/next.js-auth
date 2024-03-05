'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { links } from '@/constants/links'

import { cn } from '@/lib/utils'

export default function NavigationLinksList() {
  const pathname = usePathname()

  return (
    <ul className="flex justify-between gap-2 w-full sm:max-w-[280px]">
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link
            className={cn(
              'px-3 sm:px-4 py-2 hover:bg-muted rounded-md whitespace-nowrap transition-colors duration-200',
              { 'bg-sky-300 hover:bg-sky-400': pathname === href },
            )}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
