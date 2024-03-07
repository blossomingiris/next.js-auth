import { getAuthUser } from '@/helpers/authUser.server'

import { Card, CardContent, CardHeader } from '@/components/ui/Card'

import SettingsForm from './form/SettingsForm'

type SettingsCardProps = {
  label: string
}

export default async function SettingsCard(props: SettingsCardProps) {
  const { label } = props
  const user = await getAuthUser()

  return (
    <Card className="w-[95vw] max-w-[650px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4 pb-8 sm:pb-10 ">
        <SettingsForm user={user!} />
      </CardContent>
    </Card>
  )
}
