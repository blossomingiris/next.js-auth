import { UserRole } from '@prisma/client'
import { Control } from 'react-hook-form'

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form'
import { Switch } from '@/components/ui/Switch'

type SettingsFromSwitchProps = {
  name: 'isTwoFactorEnabled'
  description: string
  label: string
  control: Control<{
    role: UserRole
    name?: string | undefined
    isTwoFactorEnabled?: boolean | undefined
    email?: string | undefined
    password?: string | undefined
    confirm_password?: string | undefined
  }>
}

export default function SettingsFromSwitch(props: SettingsFromSwitchProps) {
  const { name, label, description, control } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        </FormItem>
      )}
    />
  )
}
