'use client'

import { useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { settings } from '@/actions/settings'

import { validation } from '@/lib/validation'

import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'

import FormSubmitButton from '../../auth/components/ui/FormSubmitButton'

type SettingsCardProps = {
  user?: User
  label: string
}

export default function SettingsCard(props: SettingsCardProps) {
  const { user, label } = props
  const { update } = useSession()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof validation.settings>>({
    resolver: zodResolver(validation.settings),
    defaultValues: {
      name: user?.name || undefined,
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
            // update server session callback with last user details
            update(data.user)
            setSuccess(data.success)
          }
          form.reset()
        })
        .catch(() => setError('Something went wrong!'))
    })
  }

  return (
    <Card className="w-[95vw] max-w-[650px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4 pb-8 sm:pb-10 ">
        <Form {...form}>
          <div className="space-y-3">
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Jane Doe"></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormSubmitButton label="Save Settings" hasSpinner={isPending} />
            </form>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
