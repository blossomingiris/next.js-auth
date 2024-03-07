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
      variant="outline"
      className="w-full bg-white font-bold border-none"
      title="logout"
    >
      {children}
    </Button>
  )
}
