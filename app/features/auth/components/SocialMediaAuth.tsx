'use client'

import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes/routes'
import { signIn } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/Button'

const buttons = [
  {
    label: 'Continue with Google',
    icon: <FcGoogle className="flex-shrink-0" size={26} />,
    provider: 'google',
  },
  {
    label: 'Continue with Github',
    icon: <FaGithub className="flex-shrink-0" size={26} />,
    provider: 'github',
  },
] as const

export default function SocialMediaAuth() {
  const handleSocialProviderClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row items-center w-full gap-4">
      {buttons.map(({ label, icon, provider }) => (
        <Button
          size="lg"
          className="w-full flex gap-x-2 min-w-[170px]"
          variant="custom"
          key={label}
          onClick={() => handleSocialProviderClick(provider)}
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  )
}
