import { v4 as uuidv4 } from 'uuid'

import {
  getResetPasswordTokenByEmail,
  getVerificationTokenByEmail,
} from '@/helpers/getToken'

import db from './db'

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // token expires in 1 hour
  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // token expires in 1 hour
  const existingToken = await getResetPasswordTokenByEmail(email)
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }
  const resetPasswordToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return resetPasswordToken
}
