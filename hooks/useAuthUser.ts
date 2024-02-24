import { useSession } from 'next-auth/react'

export function useAuthUser() {
  const session = useSession()

  return session.data?.user
}
