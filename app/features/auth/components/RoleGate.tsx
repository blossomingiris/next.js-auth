'use client'

import { ReactNode } from 'react'

import { useAuthUser } from '@/hooks/useAuthUser'
import { UserRole } from '@prisma/client'

type RoleGateProps = {
  children: ReactNode
  allowedRole: UserRole
}

export default function RoleGate(props: RoleGateProps) {
  const { children, allowedRole } = props
  const user = useAuthUser()

  if (user?.role !== allowedRole) {
    return (
      <p className="text-center">
        You do not have Admin privileges to view the content of this page.
      </p>
    )
  }

  return <>{children}</>
}
