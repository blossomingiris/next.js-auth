import { Metadata } from 'next'

import ResetPasswordForm from '@/app/features/auth/components/form/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Forgot Password',
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
