'use server'

import * as z from 'zod'

import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'
import { validation } from '@/lib/validation'

import { getUserByCondition } from '@/helpers/getUserByCondition'

export async function resetPassword(
  values: z.infer<typeof validation.resetPassword>,
) {
  const validatedFields = validation.resetPassword.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { email } = validatedFields.data
  const existingUser = await getUserByCondition(email)
  if (!existingUser) {
    return { error: 'Account with this email does not exist.' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
    existingUser.name,
  )

  return {
    success:
      'An email with reset password instructions has been sent to your email address.',
  }
}
