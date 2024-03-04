import { routePaths } from '@/routes/routes'
import { IconType } from 'react-icons/lib'

import { cn } from '@/lib/utils'

import { Card, CardFooter, CardHeader } from '@/components/ui/Card'

import BackButton from './BackButton'
import CardTitle from './CardTitle'

type CardMessageProps = {
  title: string
  description: string
  Icon: IconType
  type: 'error' | 'success'
}

export default function CardMessage(props: CardMessageProps) {
  const { title, description, Icon, type } = props

  return (
    <Card className="max-w-[500px] shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="justify-center flex flex-col items-center">
        <Icon
          size={45}
          className={cn('mr-1 sm:mr-2 mb-3 md:mb-0 flex-shrink-0 ', {
            'text-destructive': type === 'error',
            'text-emerald-500': type === 'success',
          })}
        />
        <CardTitle title={title} description={description}></CardTitle>
      </CardHeader>
      <CardFooter className="justify-center">
        <BackButton
          backButtonLabel="Back to Login"
          backButtonHref={routePaths.login}
          backButtonStyle="default"
        />
      </CardFooter>
    </Card>
  )
}
