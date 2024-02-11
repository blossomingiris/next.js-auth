import { MdErrorOutline } from 'react-icons/md'

import { routePaths } from '@/app/routes/routes'

import { Card, CardFooter, CardHeader } from '@/components/ui/Card'

import BackButton from './ui/BackButton'
import CardTitle from './ui/CardTitle'

export default function ErrorCard() {
  return (
    <Card className="max-w-[700px] shadow-md ">
      <CardHeader className="text-center flex flex-row">
        <CardTitle
          title="Unexpected error has occurred"
          description="It looks like something went wrong. Please return to the login page."
        >
          <MdErrorOutline
            size={38}
            className="mr-1 sm:mr-2 mb-3 md:mb-0 flex-shrink-0"
          />
        </CardTitle>
      </CardHeader>

      <CardFooter>
        <BackButton
          backButtonLabel="&larr; Back to Log in"
          backButtonHref={routePaths.login}
        ></BackButton>
      </CardFooter>
    </Card>
  )
}
