'use client'

import { useMemo, useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { login } from '@/actions/login'

import CardWrapper from '@/app/features/auth/components/ui/CardWrapper'
import { routePaths } from '@/app/routes/routes'

import { validation } from '@/lib/validation'

import { Form } from '@/components/ui/Form'
import { FormError } from '@/components/ui/FormError'
import { FormSuccess } from '@/components/ui/FormSuccess'
import { RenderIf } from '@/components/ui/RenderIf'

import EmailField from '../form-fields/EmailField'
import PasswordField from '../form-fields/PasswordField'
import BackButton from '../ui/BackButton'
import FormSubmitButton from '../ui/FormSubmitButton'

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const router = useRouter()
  const [switchPasswordIcon, setSwitchPasswordIcon] = useState(false)
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false)
  const searchParams = useSearchParams()
  const errorUrl =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? `This account is already associated with another provider. Please continue using the linked provider's credentials.`
      : ''

  const form = useForm<z.infer<typeof validation.login>>({
    resolver: zodResolver(validation.login),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  })

  const onFormSubmit = (values: z.infer<typeof validation.login>) => {
    startTransition(() => {
      login(values)
        .then(data => {
          if (data && data.error) {
            setError(data.error)
            form.reset()
          }
          if (data && data.twoFactor) {
            setShowTwoFactorInput(true)
          }
        })
        .catch(() => setError('Something went wrong'))
    })
    setSwitchPasswordIcon(false)
    setError('')
    setSuccess('')
  }

  //handle success&error message
  const hasFormBeenTouched = form.formState.isDirty

  if (error && hasFormBeenTouched) {
    setError('')
  } else if (success && hasFormBeenTouched) {
    setSuccess('')
  }

  useMemo(() => {
    if (errorUrl) {
      setError(errorUrl)
      router.push('/login')
    }
  }, [errorUrl, router])

  return (
    <CardWrapper
      headerTitle="Log In"
      headerDescription="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={routePaths.createAccount}
      backButtonStyle="link"
      hasSocialMedia
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="space-y-4 mb-7">
            <RenderIf isTrue={!showTwoFactorInput}>
              <EmailField name="email" hasAutoFocus />
              <PasswordField
                name="password"
                switchPasswordIcon={switchPasswordIcon}
                setSwitchPasswordIcon={setSwitchPasswordIcon}
              />
            </RenderIf>
          </div>
          <BackButton
            backButtonLabel="Forgot your password?"
            backButtonHref={routePaths.resetPassword}
            backButtonStyle="link"
          />
          <AnimatePresence>
            {error && <FormError message={error} />}
          </AnimatePresence>
          <AnimatePresence>
            {success && <FormSuccess message={success} />}
          </AnimatePresence>
          <FormSubmitButton label="Login" hasSpinner={isPending} />
        </form>
      </Form>
    </CardWrapper>
  )
}
