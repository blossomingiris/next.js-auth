import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { FieldValues, UseControllerProps } from 'react-hook-form'
import { LuEye, LuEyeOff, LuLock } from 'react-icons/lu'

import { cn } from '@/lib/utils'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form'
import { FormMessage } from '@/components/ui/FormMessage'
import { Input } from '@/components/ui/Input'
import { RenderIf } from '@/components/ui/RenderIf'

interface PasswordFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  switchPasswordIcon?: boolean
  switchConfirmPasswordIcon?: boolean
  handlePasswordValidationChange?: (value: string) => void
  setIsPasswordComplexityVisible?: Dispatch<SetStateAction<boolean>>
  setSwitchPasswordIcon?: Dispatch<SetStateAction<boolean>>
  setSwitchConfirmPasswordIcon?: Dispatch<SetStateAction<boolean>>
}

export default function PasswordField<T extends FieldValues>({
  name,
  control,
  handlePasswordValidationChange,
  setIsPasswordComplexityVisible,
  switchPasswordIcon,
  setSwitchPasswordIcon,
  setSwitchConfirmPasswordIcon,
  switchConfirmPasswordIcon,
}: PasswordFieldProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredPassword = e.target.value
    console.log(enteredPassword)
    if (name === 'password' && setSwitchPasswordIcon) {
      setSwitchPasswordIcon(enteredPassword.length > 0)
    }
    if (name === 'confirm_password' && setSwitchConfirmPasswordIcon) {
      console.log('enteredPassword', enteredPassword)
      setSwitchConfirmPasswordIcon(enteredPassword.length > 0)
    }
    handlePasswordValidationChange &&
      handlePasswordValidationChange(enteredPassword)
  }
  const handlePasswordVisibilityClick = () => {
    setIsPasswordVisible(prev => !prev)
  }

  const iconClass = 'absolute right-[9px] text-muted-foreground top-[11px]'
  const iconSize = 22

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium">
            {name === 'password' ? 'Password' : 'Confirm password'}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                name={name}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder={
                  name === 'password'
                    ? 'Enter you password'
                    : 'Confirm your password'
                }
                className="text-base w-full"
                onChange={e => {
                  handleInputChange(e)
                  field.onChange(e)
                  setIsPasswordComplexityVisible &&
                    setIsPasswordComplexityVisible(true)
                }}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => {
                  setIsPasswordFocused(false)
                  setIsPasswordComplexityVisible &&
                    setIsPasswordComplexityVisible(false)
                }}
              />
              <RenderIf
                isTrue={switchPasswordIcon! || switchConfirmPasswordIcon!}
              >
                <RenderIf isTrue={isPasswordVisible}>
                  <LuEyeOff
                    className={cn(
                      'cursor-pointer absolute right-[9px] text-muted-foreground top-[11px] bg-card',
                      {
                        'text-primary': isPasswordFocused,
                      },
                    )}
                    size={22}
                    title="Hide password"
                    onClick={handlePasswordVisibilityClick}
                  />
                </RenderIf>
                <RenderIf isTrue={!isPasswordVisible}>
                  <LuEye
                    className={cn('cursor-pointer bg-card', iconClass, {
                      'text-primary': isPasswordFocused,
                    })}
                    size={iconSize}
                    title="Show password"
                    onClick={handlePasswordVisibilityClick}
                  />
                </RenderIf>
              </RenderIf>
              <RenderIf
                isTrue={!switchPasswordIcon && !switchConfirmPasswordIcon}
              >
                <LuLock
                  className={cn(iconClass, {
                    'text-primary bg-card': isPasswordFocused,
                  })}
                  size={iconSize}
                  title="password"
                />
              </RenderIf>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
