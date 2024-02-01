'use client'

import { useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { login } from '@/actions/login'

import CardWrapper from '@/app/features/auth/components/ui/CardWrapper'
import { routePaths } from '@/app/routes/routes-path'

import { Button } from '@/components/ui/Button'
import { Form } from '@/components/ui/Form'
import { FormError } from '@/components/ui/FormError'
import { FormSuccess } from '@/components/ui/FormSuccess'

import { validationSchema } from '@/schemas'

import EmailField from './form-fields/EmailField'
import PasswordField from './form-fields/PasswordField'

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [hasError, setHasError] = useState<string | undefined>('')
  const [hasSuccess, setHasSuccess] = useState<string | undefined>('')
  const [isMessageVisible, setMessageVisible] = useState(false)
  const [switchIcon, setSwitchIcon] = useState(false)

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
        try {
          setHasSuccess(data.success)
          setMessageVisible(true)
        } catch (error) {
          setHasError((error as Error).message)
          setMessageVisible(true)
        }
      })
    })
    form.reset()
    setSwitchIcon(false)
    setHasError('')
    setHasSuccess('')
  }

  //handle success&error message
  const hasFormBeenTouched = form.formState.isDirty

  if (hasError && hasFormBeenTouched) {
    setHasError('')
  } else if (hasSuccess && hasFormBeenTouched) {
    setHasSuccess('')
  }

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
          <div className="space-y-6 mb-7">
            <EmailField name="email" hasAutoFocus />
            <PasswordField
              switchIcon={switchIcon}
              setSwitchIcon={setSwitchIcon}
              name="password"
            />
          </div>
          <AnimatePresence>
            {isMessageVisible && <FormError message={hasError} />}
          </AnimatePresence>
          <AnimatePresence>
            {isMessageVisible && <FormSuccess message={hasSuccess} />}
          </AnimatePresence>
          <Button
            className="w-full font-semibold text-lg active:scale-95 mt-5 transition-all duration-200"
            size="lg"
            disabled={isPending}
          >
            Log In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
