import { UserRole } from '@prisma/client'

import { getAllUsers } from '@/lib/db/getAllUsers'

import { Card, CardContent, CardHeader } from '@/components/ui/Card'

import RoleGate from '../../auth/components/RoleGate'
import { UsersTable } from './UsersTable'

type AdminCardProps = {
  label: string
}

export default async function AdminCard(props: AdminCardProps) {
  const { label } = props

  const users = await getAllUsers()

  return (
    <Card className="w-[95vw] max-w-[650px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4 pb-8 sm:pb-10 ">
        <RoleGate allowedRole={UserRole.ADMINISTRATOR}>
          <UsersTable users={users!} />
        </RoleGate>
      </CardContent>
    </Card>
  )
}
