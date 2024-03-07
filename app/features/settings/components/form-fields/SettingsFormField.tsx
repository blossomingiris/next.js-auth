import { UserRole } from '@prisma/client'
import { Control } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form'
import { FormMessage } from '@/components/ui/FormMessage'
import { Input } from '@/components/ui/Input'

type SettingsFormFieldProps = {
  name: 'password' | 'email' | 'name' | 'confirm_password'
  placeholder: string
  label: string
  isOAuth?: boolean
  control: Control<{
    role: UserRole
    name?: string | undefined
    isTwoFactorEnabled?: boolean | undefined
    email?: string | undefined
    password?: string | undefined
    confirm_password?: string | undefined
  }>
}

export default function SettingsFormField(props: SettingsFormFieldProps) {
  const { name, label, placeholder, control, isOAuth } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} disabled={isOAuth} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
