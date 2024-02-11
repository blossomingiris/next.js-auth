'use server'

import { AuthError } from 'next-auth'
import * as z from 'zod'

import { validationSchema } from '@/lib/validationSchema'

import { signIn } from '@/auth'

import { DEFAULT_LOGIN_REDIRECT_URL } from './../app/routes/routes'

//?progressive enhancement
export async function login(values: z.infer<typeof validationSchema.login>) {
  const validatedFields = validationSchema.login.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { email, password } = validatedFields.data

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
          return { error: 'Invalid email address or password.' }
        default:
          return { error: 'Something went wrong.' }
      }
    }
    throw error
  }
}
