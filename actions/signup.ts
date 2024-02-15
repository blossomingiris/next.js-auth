'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import db from '@/lib/db'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { validationSchema } from '@/lib/validationSchema'

import { getUserByCondition } from '@/helpers/getUserByCondition'

//?progressive enhancement
export async function signup(values: z.infer<typeof validationSchema.signup>) {
  const validatedFields = validationSchema.signup.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { firstName, lastName, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByCondition(email)

  if (existingUser) {
    throw new Error(
      'User with this email already exists. Please use a different email address.',
    )
  }

  if (!existingUser) {
    await db.user.create({
      data: {
        name: firstName + ' ' + lastName,
        email,
        password: hashedPassword,
      },
    })

    // send verification email
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      firstName,
    )
    return {
      success:
        'Account verification email has been sent to your email address.',
    }
  }
}
