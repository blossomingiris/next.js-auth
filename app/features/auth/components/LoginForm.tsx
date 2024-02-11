'use client'

import { useEffect, useState, useTransition } from 'react'

import { useSearchParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { login } from '@/actions/login'

import CardWrapper from '@/app/features/auth/components/ui/CardWrapper'
import { routePaths } from '@/app/routes/routes'

import { validationSchema } from '@/lib/validationSchema'

import { Form } from '@/components/ui/Form'
import { FormError } from '@/components/ui/FormError'

import EmailField from './form-fields/EmailField'
import PasswordField from './form-fields/PasswordField'
import FormSubmitButton from './ui/FormSubmitButton'

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [isMessageVisible, setMessageVisible] = useState(false)
  const [switchPasswordIcon, setSwitchPasswordIcon] = useState(false)
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider'
      : ''

  const form = useForm<z.infer<typeof validationSchema.login>>({
    resolver: zodResolver(validationSchema.login),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onFormSubmit = (values: z.infer<typeof validationSchema.login>) => {
    startTransition(() => {
      login(values).then(data => {
        if (data?.error) {
          setError(data?.error)
          setMessageVisible(true)
        }
      })
    })
    form.reset()
    setSwitchPasswordIcon(false)
    setError('')
  }

  const hasFormBeenTouched = form.formState.isDirty

  if (error && hasFormBeenTouched) {
    setError('')
  }

  useEffect(() => {
    if (urlError) {
      setMessageVisible(true)
      setError(urlError)
    }
  }, [urlError])

  return (
    <CardWrapper
      headerTitle="Log In"
      headerDescription="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={routePaths.createAccount}
      hasSocialMedia
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="space-y-4 mb-7">
            <EmailField name="email" hasAutoFocus />
            <PasswordField
              switchPasswordIcon={switchPasswordIcon}
              setSwitchPasswordIcon={setSwitchPasswordIcon}
              name="password"
            />
          </div>
          <AnimatePresence>
            {isMessageVisible && <FormError message={error} />}
          </AnimatePresence>
          <FormSubmitButton label="Login" hasSpinner={isPending} />
        </form>
      </Form>
    </CardWrapper>
  )
}
