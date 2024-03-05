'use client'

import { useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { AnimatePresence } from 'framer-motion'
import { User } from 'next-auth'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { settings } from '@/actions/settings'

import { validation } from '@/lib/validation'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form'
import { FormError } from '@/components/ui/FormError'
import { FormMessage } from '@/components/ui/FormMessage'
import { FormSuccess } from '@/components/ui/FormSuccess'
import { Input } from '@/components/ui/Input'
import { RenderIf } from '@/components/ui/RenderIf'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Switch } from '@/components/ui/Switch'

import FormSubmitButton from '../../auth/components/ui/FormSubmitButton'

type SettingsFormProps = {
  user: User
}

export default function SettingsForm(props: SettingsFormProps) {
  const { user } = props
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isPending, startTransition] = useTransition()

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
  }

  return (
    <Form {...form}>
      <div className="space-y-3">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Jane Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. jane.doe@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an User Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value={UserRole.ADMINISTRATOR}>
                      Administrator
                    </SelectItem>
                    <SelectItem value={UserRole.USER}>User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <RenderIf isTrue={!user.isOAuth}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter new password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Confirm new password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>2FA</FormLabel>
                    <FormDescription>
                      Enable 2FA for your Account
                    </FormDescription>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormItem>
              )}
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
