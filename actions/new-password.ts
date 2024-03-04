'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import db from '@/lib/db/db'
import { getResetPasswordTokenByToken } from '@/lib/db/getToken'
import { getUserByEmail } from '@/lib/db/getUserByCondition'
import { validation } from '@/lib/validation'

export const newPassword = async (
  values: z.infer<typeof validation.newPassword>,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'Verification token not found.' }
  }

  const validatedPassword = validation.newPassword.safeParse(values)

  if (!validatedPassword.success) {
    return { error: 'Invalid password.' }
  }

  const { password } = validatedPassword.data

  const existingToken = await getResetPasswordTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token.' }
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date()

  if (isTokenExpired) {
    return { error: 'Verification token has been expired.' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: `Account with this email doesn't exist.` }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return {
    success:
      'Your password has been successfully updated. Please use your new password to log in.',
  }
}
