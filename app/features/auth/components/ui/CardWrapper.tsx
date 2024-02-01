import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { ReactNode } from 'react'

import { BackButton } from './BackButton'
import CardOptionsLine from './CardOptionsLine'
import CardTitle from './CardTitle'
import SocialMediaGroupButtons from './SocialMediaGroupButtons'

type CardWrapperProps = {
  children: ReactNode
  headerTitle: string
  headerDescription: string
  backButtonLabel: string
  backButtonHref: string
  hasSocialMedia: boolean
}

export default function CardWrapper(props: CardWrapperProps) {
  const {
    children,
    headerTitle,
    headerDescription,
    backButtonLabel,
    backButtonHref,
  } = props

  return (
    <Card>
      <CardHeader>
        <CardTitle title={headerTitle} description={headerDescription} />
      </CardHeader>
      <CardContent>
        <SocialMediaGroupButtons />
        <CardOptionsLine />
        {children}
      </CardContent>
      <CardFooter>
        <BackButton
          backButtonLabel={backButtonLabel}
          backButtonHref={backButtonHref}
        />
      </CardFooter>
    </Card>
  )
}
