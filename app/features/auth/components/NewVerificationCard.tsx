'use client'

import { useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { FaCheckCircle } from 'react-icons/fa'
import { MdErrorOutline } from 'react-icons/md'

import { newVerification } from '@/actions/new-verification'

import { routePaths } from '@/app/routes/routes'

import { RenderIf } from '@/components/ui/RenderIf'

import CardMessage from './ui/CardErrorSuccess'
import CardWrapper from './ui/CardWrapper'

export default function NewVerificationCard() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const verifyToken = useCallback(() => {
    if (!token) {
      setError('Verification token not found.')
      return
    }
    newVerification(token).then(data => {
      try {
        setSuccess(data.success)
        setError(data.error)
      } catch (err) {
        setError('Something went wrong.')
      }
    })
  }, [token])

  useEffect(() => {
    verifyToken()
  }, [token, verifyToken])

  // refresh/create a new token

  return (
    <>
      <RenderIf isTrue={!error && !success}>
        <div className="flex items-center justify-center h-full">
          <CardWrapper
            headerTitle="Account verification"
            headerDescription=""
            backButtonLabel="Back to Sign up"
            backButtonStyle="default"
            backButtonHref={routePaths.createAccount}
            hasSocialMedia={false}
          >
            <div className="flex items-center w-full justify-center">
              <p className="animate-pulse">Confirming your email address...</p>
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
          title="Success!"
          description={success!}
          Icon={FaCheckCircle}
        />
      </RenderIf>
    </>
  )
}