'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { unstable_update } from '@/auth'

import db from '@/lib/db/db'
import { generateVerificationToken } from '@/lib/db/generateToken'
import { getUserByEmail, getUserById } from '@/lib/db/getUserByCondition'
import { sendVerificationEmail } from '@/lib/email'
import { validation } from '@/lib/validation'

import { getAuthUser } from '@/helpers/authUser.server'

export const settings = async (values: z.infer<typeof validation.settings>) => {
  const user = await getAuthUser()

  if (!user) return { error: 'Access denied. Not allowed.' }

  const dbUser = await getUserById(user.id!)

  if (!dbUser) return { error: 'Access denied. Not allowed.' }

  // if user logged in with Google or GitHub following fields wont be allowed to modify
  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.confirm_password = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)
    if (existingUser && existingUser.id !== user.id) {
      return {
        error:
          'User with this email already exists. Please use a different email address.',
      }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.id,
      values.name!,
    )

    return {
      success:
        'Account verification email has been sent to your email address.',
    }
  }

  if (values.password && values.confirm_password && dbUser.password) {
    const matchedPassword = await bcrypt.compare(
      values.password,
      dbUser.password,
    )

    if (!matchedPassword) {
      return {
        error: 'Passwords do not match',
      }
    }

    const hashedPassword = await bcrypt.hash(values.confirm_password, 10)
    values.password = hashedPassword
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  })

  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  })

  return { user: updatedUser, success: 'Your profile has been updated.' }
}
