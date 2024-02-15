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

import { validationSchema } from '@/lib/validationSchema'

import { Form } from '@/components/ui/Form'
import { FormError } from '@/components/ui/FormError'
import { FormSuccess } from '@/components/ui/FormSuccess'

import EmailField from '../form-fields/EmailField'
import PasswordField from '../form-fields/PasswordField'
import FormSubmitButton from '../ui/FormSubmitButton'

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [switchPasswordIcon, setSwitchPasswordIcon] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorUrl =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? `This account is already associated with another provider. Please continue using the linked provider's credentials.`
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
        }
        // if (data?.success) {
        //   setSuccess(data.success)
        // }
      })
    })
    form.reset()
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
            <EmailField name="email" hasAutoFocus />
            <PasswordField
              switchPasswordIcon={switchPasswordIcon}
              setSwitchPasswordIcon={setSwitchPasswordIcon}
              name="password"
            />
          </div>
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
