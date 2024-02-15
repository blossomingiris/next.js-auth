'use server'

import db from '@/lib/db'

import { getUserByCondition } from '@/helpers/getUserByCondition'
import { getVerificationTokenByToken } from '@/helpers/getVerificationToken'

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken) {
    return { error: 'Verification token not found.' }
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date()

  if (isTokenExpired) {
    return { error: 'Verification token has been expired.' }
  }

  const existingUser = await getUserByCondition(existingToken.email)

  if (!existingUser) {
    return { error: 'Account with this email already exists.' }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  })

  //remove old verification token from db
  await db.verificationToken.delete({
    where: { id: existingUser.id },
  })

  return {
    success: 'Your account has been verified!',
  }
}
