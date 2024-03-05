'use server'

import * as z from 'zod'

import { generatePasswordResetToken } from '@/lib/db/generateToken'
import { getUserByEmail } from '@/lib/db/getUserByCondition'
import { sendPasswordResetEmail } from '@/lib/email'
import { validation } from '@/lib/validation'

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
  const existingUser = await getUserByEmail(email)
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
