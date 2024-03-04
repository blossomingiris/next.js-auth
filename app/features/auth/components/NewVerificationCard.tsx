'use client'

import { useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { routePaths } from '@/routes/routes'
import { FaCheckCircle } from 'react-icons/fa'
import { MdErrorOutline } from 'react-icons/md'

import { newVerification } from '@/actions/new-verification'

import { RenderIf } from '@/components/ui/RenderIf'

import CardMessage from './ui/CardErrorSuccess'
import CardWrapper from './ui/CardWrapper'

export default function NewVerificationCard() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const verifyToken = useCallback(() => {
    if (!token) {
      setError('Verification token not found.')
      return
    }
    setIsLoading(true)
    newVerification(token).then(data => {
      try {
        setSuccess(data.success)
        setError(data.error)
      } catch (err) {
        setError('Something went wrong.')
      } finally {
        setIsLoading(false)
      }
    })
  }, [token])

  useEffect(() => {
    verifyToken()
  }, [token, verifyToken])

  return (
    <>
      <RenderIf isTrue={!error && !success}>
        <div className="flex items-center justify-center h-full">
          <CardWrapper
            headerTitle="Account verification"
            headerDescription=""
            backButtonLabel="Back Login"
            backButtonStyle="default"
            backButtonHref={routePaths.login}
            isBackButtonDisabled={isLoading}
          >
            <div className="flex items-center w-full justify-center">
              <p className="animate-pulse pb-8 sm:pb-10 text-center">
                Confirming your email address...
              </p>
            </div>
          </CardWrapper>
        </div>
      </RenderIf>
      <RenderIf isTrue={!!error}>
        <CardMessage
          type="error"
          title="An error occurred"
          description={error!}
          Icon={MdErrorOutline}
        />
      </RenderIf>
      <RenderIf isTrue={!!success}>
        {' '}
        <CardMessage
          type="success"
          title="Done!"
          description={success!}
          Icon={FaCheckCircle}
        />
      </RenderIf>
    </>
  )
}
