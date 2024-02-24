'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import db from '@/lib/db'
import { sendVerificationEmail } from '@/lib/mail'
import { validation } from '@/lib/validation'

import { generateVerificationToken } from '@/helpers/generateToken'
import { getUserByEmail } from '@/helpers/getUserByCondition'

//?progressive enhancement
export async function signup(values: z.infer<typeof validation.signup>) {
  const validatedFields = validation.signup.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { firstName, lastName, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return {
      error:
        'User with this email already exists. Please use a different email address.',
    }
  }

  if (!existingUser) {
    await db.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
      },
    })

    // send verification email
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      firstName + lastName,
    )
    return {
      success:
        'Account verification email has been sent to your email address.',
    }
  }
}
