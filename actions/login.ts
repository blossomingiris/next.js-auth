'use server'

import { AuthError } from 'next-auth'
import * as z from 'zod'

import { DEFAULT_LOGIN_REDIRECT_URL } from '@/app/routes/routes'

import { signIn } from '@/auth'

// import { generateVerificationToken } from '@/lib/tokens'
import { validation } from '@/lib/validation'

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
    return { error: 'Account with this email does not exist.' }
  }

  if (!existingUser.emailVerified) {
    // await generateVerificationToken(existingUser.email)
    return {
      error:
        'Your are account is not verified. Please check your email inbox and proceed with verification instructions.',
    }
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
