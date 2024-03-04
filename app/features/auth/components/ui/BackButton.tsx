import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/Button'

type BackButtonProps = {
  backButtonLabel: string
  backButtonHref: string
  backButtonStyle: 'default' | 'link'
  isBackButtonDisabled?: boolean
}

export default function BackButton(props: BackButtonProps) {
  const {
    backButtonLabel,
    backButtonHref,
    backButtonStyle = 'default',
    isBackButtonDisabled = false,
  } = props

  return (
    <Button
      className={cn('w-full', {
        'justify-end': backButtonLabel === 'Forgot your password?',
      })}
      asChild
      type="button"
      size="lg"
      variant={backButtonStyle}
      disabled={isBackButtonDisabled}
    >
      <Link href={backButtonHref}>{backButtonLabel}</Link>
    </Button>
  )
}
