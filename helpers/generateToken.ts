import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

import {
  getResetPasswordTokenByEmail,
  getTwoFactorTokenByEmail,
  getVerificationTokenByEmail,
} from '@/helpers/getToken'

import db from '../lib/db'

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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(10000, 1000_000).toString()
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000) // 2factor token expires in 15 minutes
  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return twoFactorToken
}
