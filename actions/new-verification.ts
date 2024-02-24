'use server'

import db from '@/lib/db'

import { getVerificationTokenByToken } from '@/helpers/getToken'
import { getUserByEmail } from '@/helpers/getUserByCondition'

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken) {
    return { error: 'Verification token not found.' }
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date()

  if (isTokenExpired) {
    return { error: 'Verification token has been expired.' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Account with this email already exists.' }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  })

  //remove old verification token from db
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingUser.id },
    })
  }

  return {
    success: 'Your account has been verified.',
  }
}
