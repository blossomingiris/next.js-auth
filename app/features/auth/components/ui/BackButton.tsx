import Link from 'next/link'

import { Button } from '@/components/ui/Button'

type BackButtonProps = {
  backButtonLabel: string
  backButtonHref: string
  backButtonStyle: 'default' | 'link'
}

export default function BackButton(props: BackButtonProps) {
  const { backButtonLabel, backButtonHref, backButtonStyle = 'default' } = props

  return (
    <Button
      className="w-full"
      asChild
      type="button"
      size="lg"
      variant={backButtonStyle}
    >
      <Link href={backButtonHref}>{backButtonLabel}</Link>
    </Button>
  )
}
