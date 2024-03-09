'use server'

import db from '@/lib/db/db'
import { getUserById } from '@/lib/db/getUserByCondition'

import { getAuthUser } from '@/helpers/authUser.server'

const ACCESS_DENIED_ERROR = 'Access denied. Not allowed.'

export const deleteUser = async () => {
  try {
    const user = await getAuthUser()
    if (!user) {
      return { error: ACCESS_DENIED_ERROR }
    }
    const dbUser = await getUserById(user.id!)

    if (!dbUser) {
      return { error: ACCESS_DENIED_ERROR }
    }

    await db.user.delete({ where: { id: dbUser.id } })
    return { success: '"Your account has been successfully deleted.' }
  } catch (error) {
    return { error: 'Unexpected error has occurred.' }
  }
}
