import { Metadata } from 'next'

import NewPasswordForm from '@/app/features/auth/components/form/NewPasswordForm'

export const metadata: Metadata = {
  title: 'Create a new password',
}

export default function newPasswordPage() {
  return <NewPasswordForm />
}
