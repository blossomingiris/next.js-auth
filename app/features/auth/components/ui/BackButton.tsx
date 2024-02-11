import Link from 'next/link'

import { Button } from '@/components/ui/Button'

type BackButtonProps = {
  backButtonLabel: string
  backButtonHref: string
}

export default function BackButton(props: BackButtonProps) {
  const { backButtonLabel, backButtonHref } = props

  return (
    <Button variant="link" className="w-full" asChild type="button">
      <Link href={backButtonHref}>{backButtonLabel}</Link>
    </Button>
  )
}
