import { MdErrorOutline } from 'react-icons/md'

import CardMessage from '@/app/features/auth/components/ui/CardErrorSuccess'

export default function NotFound() {
  return (
    <CardMessage
      title="404 Error"
      description="Sorry this page was not found."
      Icon={MdErrorOutline}
      type="error"
    />
  )
}
