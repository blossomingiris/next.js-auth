'use server'

import * as z from 'zod'

import db from '@/lib/db/db'
import { getUserById } from '@/lib/db/getUserByCondition'
import { validation } from '@/lib/validation'

import { getAuthUser } from '@/helpers/authUser.server'

export const settings = async (values: z.infer<typeof validation.settings>) => {
  const user = await getAuthUser()

  if (!user) return { error: 'Access denied. Not allowed' }

  const dbUser = await getUserById(user.id!)

  if (!dbUser) return { error: 'Access denied. Not allowed' }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  })

  return { user: updatedUser, success: 'Your profile has been updated' }
}
