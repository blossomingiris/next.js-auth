'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { User } from 'next-auth'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { settings } from '@/actions/settings'

import { validation } from '@/lib/validation'

import { Form } from '@/components/ui/Form'
import { FormError } from '@/components/ui/FormError'
import { FormSuccess } from '@/components/ui/FormSuccess'
import { RenderIf } from '@/components/ui/RenderIf'

import FormSubmitButton from '../../../auth/components/ui/FormSubmitButton'
import SettingsFormSelect from '../form-fields/SettingFormSelect'
import SettingsFromField from '../form-fields/SettingsFormField'
import SettingsFromSwitch from '../form-fields/SettingsFormSwitch'

type SettingsFormProps = {
  user: User
}

export default function SettingsForm(props: SettingsFormProps) {
  const { user } = props
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<z.infer<typeof validation.settings>>({
    resolver: zodResolver(validation.settings),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      confirm_password: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  })

  const onSubmit = (values: z.infer<typeof validation.settings>) => {
    startTransition(() => {
      settings(values)
        .then(data => {
          if (data.error) {
            setError(data.error)
          }
          if (data.success) {
            // update server session callback with updated user details
            setSuccess(data.success)
          }
          form.reset()
        })
        .catch(() => setError('Something went wrong.'))
    })
    router.refresh()
  }

  return (
    <Form {...form}>
      <div className="space-y-3">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <SettingsFromField
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="e.g. Jane Doe"
            isOAuth
          />
          <SettingsFromField
            control={form.control}
            name="email"
            label="Email"
            placeholder="e.g. jane.doe@example.com"
            isOAuth
          />
          <SettingsFormSelect
            control={form.control}
            name="role"
            label="User Role"
            placeholder="Select an User Role"
          />
          <RenderIf isTrue={!user.isOAuth}>
            <SettingsFromField
              control={form.control}
              name="password"
              label="New password"
              placeholder="Enter new password"
            />
            <SettingsFromField
              control={form.control}
              name="confirm_password"
              label="Confirm New password"
              placeholder="Confirm new password"
            />
            <SettingsFromSwitch
              name="isTwoFactorEnabled"
              label="2FA"
              description="Enable 2FA for your Account"
              control={form.control}
            />
          </RenderIf>
          <AnimatePresence>
            {error && <FormError message={error} />}
          </AnimatePresence>
          <AnimatePresence>
            {success && <FormSuccess message={success} />}
          </AnimatePresence>
          <FormSubmitButton label="Save Settings" hasSpinner={isPending} />
        </form>
      </div>
    </Form>
  )
}
