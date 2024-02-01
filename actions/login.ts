'use server'

import { validationSchema } from '@/schemas'
import * as z from 'zod'

//progressive enhasment
export async function login(values: z.infer<typeof validationSchema.login>) {
  const validatedFields = validationSchema.login.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  return { success: 'Email sent successfully' }
}
