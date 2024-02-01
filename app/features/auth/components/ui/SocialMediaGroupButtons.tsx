'use client'

import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/Button'

const buttons = [
  {
    label: 'Continue with Google',
    icon: <FcGoogle className="flex-shrink-0" size={26} />,
  },
  {
    label: 'Continue with Github',
    icon: <FaGithub className="flex-shrink-0" size={26} />,
  },
]

export default function SocialMediaGroupButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full gap-4">
      {buttons.map(({ label, icon }) => (
        <Button
          size="lg"
          className="w-full flex gap-x-2 min-w-[170px]"
          variant="custom"
          key={label}
          onClick={() => {}}
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  )
}
