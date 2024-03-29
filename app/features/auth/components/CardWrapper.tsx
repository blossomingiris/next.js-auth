import { ReactNode } from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { RenderIf } from '@/components/ui/RenderIf'

import SocialMediaAuth from './SocialMediaAuth'
import BackButton from './ui/BackButton'
import CardOptionsLine from './ui/CardOptionsLine'
import CardTitle from './ui/CardTitle'

type CardWrapperProps = {
  children: ReactNode
  headerTitle: string
  headerDescription: string
  backButtonLabel: string
  backButtonHref: string
  backButtonStyle: 'default' | 'link'
  hasSocialMedia?: boolean
  isBackButtonDisabled?: boolean
}

export default function CardWrapper(props: CardWrapperProps) {
  const {
    children,
    headerTitle,
    headerDescription,
    backButtonLabel,
    backButtonHref,
    hasSocialMedia = false,
    backButtonStyle,
    isBackButtonDisabled,
  } = props

  return (
    <Card>
      <CardHeader>
        <CardTitle title={headerTitle} description={headerDescription} />
      </CardHeader>
      <CardContent>
        <RenderIf isTrue={hasSocialMedia}>
          <SocialMediaAuth />
          <CardOptionsLine />
        </RenderIf>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton
          backButtonLabel={backButtonLabel}
          isBackButtonDisabled={isBackButtonDisabled}
          backButtonHref={backButtonHref}
          backButtonStyle={backButtonStyle}
        />
      </CardFooter>
    </Card>
  )
}
