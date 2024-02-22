'use client'

import { useEffect, useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { signup } from '@/actions/signup'

import CardWrapper from '@/app/features/auth/components/ui/CardWrapper'
import { routePaths } from '@/app/routes/routes'

import { validation } from '@/lib/validation'

import { Form } from '@/components/ui/Form'
import { FormError } from '@/components/ui/FormError'
import { FormSuccess } from '@/components/ui/FormSuccess'

import usePasswordValidation from '../../hooks/usePasswordValidation'
import EmailField from '../form-fields/EmailField'
import NameField from '../form-fields/NameField'
import PasswordField from '../form-fields/PasswordField'
import FormSubmitButton from '../ui/FormSubmitButton'
import PasswordCriteriaList from '../ui/PasswordCriteriaList'

export function SignupForm() {
  const [isMessageVisible, setMessageVisible] = useState(false)
  const [isPasswordComplexityVisible, setIsPasswordComplexityVisible] =
    useState(true)
  const [switchPasswordIcon, setSwitchPasswordIcon] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [hasError, setHasError] = useState<string | undefined>('')
  const [hasSuccess, setHasSuccess] = useState<string | undefined>('')
  const {
    isValid,
    password,
    validationCriteria,
    handlePasswordValidationChange,
  } = usePasswordValidation()

  const form = useForm<z.infer<typeof validation.signup>>({
    resolver: zodResolver(validation.signup),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const onFormSubmit = (values: z.infer<typeof validation.signup>) => {
    if (!isValid) {
      setIsPasswordComplexityVisible(true)
    } else {
      startTransition(() => {
        signup(values).then(data => {
          if (data && data.success) setHasSuccess(data.success)
          if (data && data.error)
            setHasError(data.error || 'An expected error occurred')
        })
        setMessageVisible(true)
        form.reset()
      })
    }
    showErrorOrSuccessMessage()
  }

  const { isDirty, dirtyFields } = form.formState

  const showErrorOrSuccessMessage = () => {
    if (hasError) {
      setHasError('')
      setMessageVisible(false)
    } else if (hasSuccess) {
      setHasSuccess('')
      setMessageVisible(false)
    }
  }

  useEffect(() => {
    if ((hasError || hasSuccess) && isDirty) {
      setMessageVisible(false)
    }
  }, [isDirty, hasError, hasSuccess])

  return (
    <CardWrapper
      headerTitle="Create an Account"
      headerDescription="Get started"
      backButtonLabel="Already have an account?"
      backButtonHref={routePaths.login}
      backButtonStyle="link"
      hasSocialMedia
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="space-y-4 mb-7">
            <NameField
              form={form}
              name="firstName"
              placeholder="Enter your first name"
              label="First name"
              hasAutoFocus
            />
            <NameField
              form={form}
              name="lastName"
              placeholder="Enter you last name"
              label="Last name"
            />
            <EmailField name="email" />
            <div>
              <PasswordField
                name="password"
                handlePasswordValidationChange={handlePasswordValidationChange}
                setIsPasswordComplexityVisible={setIsPasswordComplexityVisible}
                switchPasswordIcon={switchPasswordIcon}
                setSwitchPasswordIcon={setSwitchPasswordIcon}
              />
              <AnimatePresence>
                {!isValid &&
                  password &&
                  isPasswordComplexityVisible &&
                  dirtyFields.password && (
                    <PasswordCriteriaList
                      validationCriteria={validationCriteria}
                    />
                  )}
              </AnimatePresence>
            </div>
          </div>
          <AnimatePresence>
            {isMessageVisible && <FormError message={hasError} />}
          </AnimatePresence>
          <AnimatePresence>
            {isMessageVisible && <FormSuccess message={hasSuccess} />}
          </AnimatePresence>
          <FormSubmitButton label="Create Account" hasSpinner={isPending} />
        </form>
      </Form>
    </CardWrapper>
  )
}
