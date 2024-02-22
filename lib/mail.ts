import { Resend } from 'resend'

import EmailTemplate from '@/app/features/auth/components/ui/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

const resetPasswordDescription =
  'To reset your password, please click the link below:'
const accountVerificationDescription =
  'To verify your account, please click the link below:'
const twoFactorVerificationDescription =
  'Your two-factor authentication code is: '

export const sendVerificationEmail = async (
  email: string,
  token: string,
  username: string,
) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'XR Auth <onboarding@resend.dev>',
    to: email,
    subject: 'Account verification request',
    react: EmailTemplate({
      username: username,
      url: confirmationLink,
      description: accountVerificationDescription,
    }),
  })
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  username: string,
) => {
  const resetPasswordLink = `http://localhost:3000/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'XR Auth <onboarding@resend.dev>',
    to: email,
    subject: 'Password reset request',
    react: EmailTemplate({
      username: username,
      url: resetPasswordLink,
      description: resetPasswordDescription,
    }),
  })
}

export const sendTwoFactorVerificationEmail = async (
  email: string,
  token: string,
  username: string,
) => {
  await resend.emails.send({
    from: 'XR Auth <onboarding@resend.dev>',
    to: email,
    subject: '2FA Code',
    react: EmailTemplate({
      username: username,
      description: twoFactorVerificationDescription + token,
    }),
  })
}
