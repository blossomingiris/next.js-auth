'use server'

import bcrypt from 'bcrypt'
import * as z from 'zod'

import db from '@/lib/db'

import { validationSchema } from '@/schemas'

//progressive enhancement
export async function signup(values: z.infer<typeof validationSchema.signup>) {
  const validatedFields = validationSchema.signup.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { firstName, lastName, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  if (existingUser) {
    throw new Error(
      'User with this email already exists. Please use a different email address.',
    )
  }

  if (!existingUser) {
    await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    })
    return { success: 'Your account has been created.' }
  }
}
