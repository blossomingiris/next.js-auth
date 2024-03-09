'use client'

import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

import { deleteUser } from '@/actions/delete-user'

import { Button } from '@/components/ui/Button'

export default function DeleteUserButton() {
  const deleteUserHandler = () => {
    deleteUser().then(data => {
      if (data && data.success) {
        signOut()
        return toast.success(data.success)
      }
      if (data && data.error) {
        return toast.error(data.error)
      }
    })
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full font-semibold mt-8 text-lg active:scale-95 transition-all duration-200 hover:border-red-500 hover:bg-red-100 hover:text-red-500"
      type="button"
      onClick={deleteUserHandler}
    >
      Delete Profile
    </Button>
  )
}
