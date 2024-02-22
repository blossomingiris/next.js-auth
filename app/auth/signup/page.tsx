import { Metadata } from 'next'

import { SignupForm } from '@/app/features/auth/components/form/SignupForm'

export const metadata: Metadata = {
  title: 'Create an account',
}

export default function RegisterPage() {
  return <SignupForm />
}
