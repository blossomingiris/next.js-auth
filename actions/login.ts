'use server'

import { AuthError } from 'next-auth'
import * as z from 'zod'

import { DEFAULT_LOGIN_REDIRECT_URL } from '@/app/routes/routes'

import { signIn } from '@/auth'

import { sendTwoFactorVerificationEmail } from '@/lib/mail'
import { validation } from '@/lib/validation'

import { generateTwoFactorToken } from '@/helpers/generateToken'
import { getUserByCondition } from '@/helpers/getUserByCondition'

//?progressive enhancement
export async function login(values: z.infer<typeof validation.login>) {
  const validatedFields = validation.login.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { email, password } = validatedFields.data

  const existingUser = await getUserByCondition(email)

  if (!existingUser || !existingUser.password || !existingUser.password) {
    return { error: 'Account with this credentials does not exist.' }
  }

  if (!existingUser.emailVerified) {
    return {
      error:
        'Your are account is not verified. Please check your email inbox and proceed with verification instructions.',
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email)
    await sendTwoFactorVerificationEmail(
      twoFactorToken.email,
      twoFactorToken.token,
      existingUser.name,
    )
    return { twoFactor: true }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials.' }
        default:
          return { error: 'Something went wrong.' }
      }
    }
    throw error
  }
}
