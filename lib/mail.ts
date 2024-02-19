import { Resend } from 'resend'

import EmailTemplate from '@/app/features/auth/components/ui/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

const resetPasswordDescription =
  'To reset your password, please click the button below:'
const accountVerificationDescription =
  'To verify your account, please click the button below:'

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
