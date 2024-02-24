'use client'

import { useEffect, useState, useTransition } from 'react'

import { useSearchParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { newPassword } from '@/actions/new-password'

import CardWrapper from '@/app/features/auth/components/ui/CardWrapper'
import { routePaths } from '@/app/routes/routes'

import { validation } from '@/lib/validation'

import { Form } from '@/components/ui/Form'
import { FormError } from '@/components/ui/FormError'
import { FormSuccess } from '@/components/ui/FormSuccess'

import usePasswordValidation from '../../../../../hooks/usePasswordValidation'
import PasswordField from '../form-fields/PasswordField'
import FormSubmitButton from '../ui/FormSubmitButton'
import PasswordCriteriaList from '../ui/PasswordCriteriaList'

export default function NewPasswordForm() {
  const [isMessageVisible, setMessageVisible] = useState(false)
  const [isPasswordComplexityVisible, setIsPasswordComplexityVisible] =
    useState(true)
  const [switchPasswordIcon, setSwitchPasswordIcon] = useState(false)
  const [switchConfirmPasswordIcon, setSwitchConfirmPasswordIcon] =
    useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const {
    isValid,
    password,
    validationCriteria,
    handlePasswordValidationChange,
  } = usePasswordValidation()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const form = useForm<z.infer<typeof validation.newPassword>>({
    resolver: zodResolver(validation.newPassword),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  })

  const onFormSubmit = (values: z.infer<typeof validation.newPassword>) => {
    if (!isValid) {
      setIsPasswordComplexityVisible(true)
    } else {
      startTransition(() => {
        newPassword(values, token).then(data => {
          if (data && data.success) setSuccess(data.success)
          if (data && data.error) setError(data.error)
        })
        setMessageVisible(true)
        form.reset()
      })
    }
    setSwitchPasswordIcon(false)
    setSwitchConfirmPasswordIcon(false)
    showErrorOrSuccessMessage()
  }

  const { isDirty, dirtyFields } = form.formState

  const showErrorOrSuccessMessage = () => {
    if (error) {
      setError('')
      setMessageVisible(false)
    } else if (success) {
      setSuccess('')
      setMessageVisible(false)
    }
  }

  useEffect(() => {
    if ((error || success) && isDirty) {
      setMessageVisible(false)
    }
  }, [isDirty, error, success])

  return (
    <CardWrapper
      headerTitle="Password Reset"
      headerDescription="Create a new password"
      backButtonLabel="Back to Login"
      backButtonHref={routePaths.login}
      backButtonStyle="link"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="space-y-4 mb-7">
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
            <PasswordField
              name="confirm_password"
              handlePasswordValidationChange={handlePasswordValidationChange}
              switchConfirmPasswordIcon={switchConfirmPasswordIcon}
              setSwitchConfirmPasswordIcon={setSwitchConfirmPasswordIcon}
            />
          </div>
          <AnimatePresence>
            {isMessageVisible && <FormError message={error} />}
          </AnimatePresence>
          <AnimatePresence>
            {isMessageVisible && <FormSuccess message={success} />}
          </AnimatePresence>
          <FormSubmitButton label="Submit" hasSpinner={isPending} />
        </form>
      </Form>
    </CardWrapper>
  )
}
