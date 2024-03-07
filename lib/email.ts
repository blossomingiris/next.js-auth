import { Resend } from 'resend'

import EmailTemplate from '@/app/features/auth/components/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

const resetPasswordDescription =
  'To reset your password, please click the button below:'
const accountVerificationDescription =
  'To verify your account, please click the button below:'
const twoFactorVerificationDescription =
  'Your two-factor authentication code is: '

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationEmail = async (
  email: string,
  token: string,
  username: string,
) => {
  const confirmationLink = `${BASE_URL}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'mail@xr-auth.online',
    to: email,
    subject: 'Account Verification request',
    react: EmailTemplate({
      username: username,
      url: confirmationLink,
      description: accountVerificationDescription,
      buttonText: 'Verify',
    }),
  })
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  username: string,
) => {
  const resetPasswordLink = `${BASE_URL}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'mail@xr-auth.online',
    to: email,
    subject: 'Password Reset request',
    react: EmailTemplate({
      username: username,
      url: resetPasswordLink,
      description: resetPasswordDescription,
      buttonText: 'Reset',
    }),
  })
}

export const sendTwoFactorVerificationEmail = async (
  email: string,
  token: string,
  username: string,
) => {
  await resend.emails.send({
    from: 'mail@xr-auth.online',
    to: email,
    subject: '2FA Code',
    react: EmailTemplate({
      username: username,
      description: `${twoFactorVerificationDescription} ${token} (expired in 10 minutes)`,
    }),
  })
}
