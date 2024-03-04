import SettingsCard from '@/app/features/settings/components/SettingsCard'

import { getAuthUser } from '@/helpers/authUser.server'

export default async function SettingsPage() {
  const user = await getAuthUser()
  return <SettingsCard label="Profile Settings" user={user} />
}
