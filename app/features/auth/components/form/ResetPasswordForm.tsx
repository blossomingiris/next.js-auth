'use client'

import { useState, useTransition } from 'react'

import { routePaths } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { resetPassword } from '@/actions/reset-password'

import CardWrapper from '@/app/features/auth/components/ui/CardWrapper'

import { validation } from '@/lib/validation'

import { Form } from '@/components/ui/Form'
import { FormError } from '@/components/ui/FormError'
import { FormSuccess } from '@/components/ui/FormSuccess'

import EmailField from '../form-fields/EmailField'
import FormSubmitButton from '../ui/FormSubmitButton'

export default function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof validation.resetPassword>>({
    resolver: zodResolver(validation.resetPassword),
    defaultValues: {
      email: '',
    },
  })

  const onFormSubmit = (values: z.infer<typeof validation.resetPassword>) => {
    startTransition(() => {
      resetPassword(values).then(data => {
        if (data && data.error) setError(data?.error)
        if (data && data.success) setSuccess(data.success)
      })
    })
    form.reset()
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

  return (
    <CardWrapper
      headerTitle="Password Reset"
      headerDescription="Please enter your email to reset password"
      backButtonLabel="Back to Login"
      backButtonHref={routePaths.login}
      backButtonStyle="link"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="space-y-4 mb-7">
            <EmailField name="email" hasAutoFocus />
          </div>
          <AnimatePresence>
            {error && <FormError message={error} />}
          </AnimatePresence>
          <AnimatePresence>
            {success && <FormSuccess message={success} />}
          </AnimatePresence>
          <FormSubmitButton label="Reset" hasSpinner={isPending} />
        </form>
      </Form>
    </CardWrapper>
  )
}
