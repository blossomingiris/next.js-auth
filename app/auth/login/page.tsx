import { Metadata } from 'next'

import LoginForm from '@/app/features/auth/components/form/LoginForm'

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return <LoginForm />
}
