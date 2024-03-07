import { MdErrorOutline } from 'react-icons/md'

import CardMessage from '@/app/features/auth/components/CardErrorSuccess'

export default function AuthErrorPage() {
  return (
    <CardMessage
      title="Unexpected error has occurred"
      description="It looks like something went wrong."
      Icon={MdErrorOutline}
      type="error"
    />
  )
}
