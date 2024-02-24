'use server'

import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import * as z from 'zod'

import { DEFAULT_LOGIN_REDIRECT_URL } from '@/app/routes/routes'

import { signIn } from '@/auth'

import db from '@/lib/db'
import { sendTwoFactorVerificationEmail } from '@/lib/mail'
import { validation } from '@/lib/validation'

import { generateTwoFactorToken } from '@/helpers/generateToken'
import { getTwoFactorTokenByEmail } from '@/helpers/getToken'
import { getTwoFactorConfirmationByUserId } from '@/helpers/getTwoFactorConfirmationByUserId'
import { getUserByEmail } from '@/helpers/getUserByCondition'

//?progressive enhancement
export async function login(values: z.infer<typeof validation.login>) {
  const validatedFields = validation.login.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Account with given credentials does not exist.' }
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password)

  if (!passwordsMatch) {
    return { error: 'Account with given credentials does not exist.' }
  }

  if (!existingUser.emailVerified) {
    return {
      error:
        'Your are account is not verified. Please check your email inbox and proceed with verification instructions.',
    }
  }

  // send 2FA code by email
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) {
        return { error: '2FA code is not valid. Please try again.' }
      }

      if (twoFactorToken.token !== code) {
        return { error: '2FA code is not valid. Please try again.' }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return { error: 'Code expired!' }
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      )

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorVerificationEmail(
        twoFactorToken.email,
        twoFactorToken.token,
        existingUser.name,
      )
      return { twoFactor: true }
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      code,
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
