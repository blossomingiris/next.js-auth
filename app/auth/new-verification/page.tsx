import { Metadata } from 'next'

import NewVerificationCard from '@/app/features/auth/components/NewVerificationCard'

export const metadata: Metadata = {
  title: 'Account verification',
}
export default function NewVerificationPage() {
  return <NewVerificationCard />
}
