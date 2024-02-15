import { Resend } from 'resend'

import EmailTemplate from '@/app/features/auth/components/ui/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
  email: string,
  token: string,
  firstName: string,
) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'XR Auth <onboarding@resend.dev>',
    to: email,
    subject: 'Verify your email address',
    react: EmailTemplate({
      firstName: firstName,
      confirmationLink: confirmationLink,
    }),
  })
}
