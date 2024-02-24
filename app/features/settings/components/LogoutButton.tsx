'use client'

import { ReactNode } from 'react'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/Button'

type LogoutButtonProps = {
  children: ReactNode
}

export default function LogoutButton(props: LogoutButtonProps) {
  const { children } = props

  return (
    <Button
      type="button"
      onClick={() => signOut()}
      className="px-2 py-3"
      title="logout"
    >
      <span role="img" aria-label="Logout Icon">
        {children}
      </span>
    </Button>
  )
}
