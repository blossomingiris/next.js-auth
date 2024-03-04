import UserCard from '@/app/features/settings/components/UserCard'

import { getAuthUser } from '@/helpers/authUser.server'

export default async function ProfilePage() {
  const user = await getAuthUser()
  return <UserCard label="My Profile" user={user} />
}
