import { ReactNode } from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { RenderIf } from '@/components/ui/RenderIf'

import SocialMediaAuth from '../SocialMediaAuth'
import BackButton from './BackButton'
import CardOptionsLine from './CardOptionsLine'
import CardTitle from './CardTitle'

type CardWrapperProps = {
  children: ReactNode
  headerTitle: string
  headerDescription: string
  backButtonLabel: string
  backButtonHref: string
  backButtonStyle: 'default' | 'link'
  hasSocialMedia: boolean
}

export default function CardWrapper(props: CardWrapperProps) {
  const {
    children,
    headerTitle,
    headerDescription,
    backButtonLabel,
    backButtonHref,
    hasSocialMedia,
    backButtonStyle,
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
          backButtonHref={backButtonHref}
          backButtonStyle={backButtonStyle}
        />
      </CardFooter>
    </Card>
  )
}
