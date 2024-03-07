import { User } from 'next-auth'

import { Card, CardContent, CardHeader } from '@/components/ui/Card'

type UserPropsCard = {
  user?: User
  label: string
}

export default function UserCard(props: UserPropsCard) {
  const { user, label } = props

  const profileDetail = (
    title: string,
    detail: string | boolean | null | undefined,
  ) => (
    <div className="grid grid-cols-[1fr_40%] rounded-lg border p-3 shadow-sm items-center ">
      <p className="font-medium">{title}</p>
      {typeof detail === 'boolean' ? (
        <span className="text-center py-1 px-2 bg-sky-100 rounded-md h-8">
          {detail ? 'Active' : 'Inactive'}
        </span>
      ) : (
        <p className="truncate text-center py-1 px-2 bg-sky-100 rounded-md h-8 ">
          {detail}
        </p>
      )}
    </div>
  )

  return (
    <Card className="w-[95vw] max-w-[650px] shadow-md min-h-[720px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-5 pb-8 sm:pb-10 ">
        {profileDetail('User ID', user?.id)}
        {profileDetail('Full Name', user?.name)}
        {profileDetail('Email Address', user?.email)}
        {profileDetail('Role', user?.role)}
        {profileDetail('2FA', user?.isTwoFactorEnabled)}
      </CardContent>
    </Card>
  )
}
