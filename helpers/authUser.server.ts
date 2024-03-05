// get user profile for server components
import { auth } from '@/auth'

export const getAuthUser = async () => {
  const session = await auth()

  return session?.user
}

export const getAuthUserRole = async () => {
  const session = await auth()
  return session?.user?.role
}
