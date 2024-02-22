import db from '@/lib/db'

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verifiedToken = await db.verificationToken.findFirst({
      where: { email },
    })
    return verifiedToken
  } catch {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verifiedToken = await db.verificationToken.findUnique({
      where: { token },
    })
    return verifiedToken
  } catch {
    return null
  }
}

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    })
    return passwordResetToken
  } catch {
    return null
  }
}

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    })
    return passwordResetToken
  } catch {
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    })
    return twoFactorToken
  } catch {
    return null
  }
}

export const getTwoFactorToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    })
    return twoFactorToken
  } catch {
    return null
  }
}
