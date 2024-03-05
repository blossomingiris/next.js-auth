'use server'

import db from '@/lib/db/db'
import { getVerificationTokenByToken } from '@/lib/db/getToken'
import { getUserByEmail } from '@/lib/db/getUserByCondition'

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

  const verifiedUser = await getUserByEmail(existingToken.email)

  if (!!verifiedUser?.emailVerified) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    })
    return {
      success: 'Your account has been verified.',
    }
  } else {
    return { error: 'Email verification failed.' }
  }
}
