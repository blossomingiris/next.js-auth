import { z } from 'zod'

export const validationSchema = {
  login: z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email is required' })
      .email('Invalid email format: e.g. jane.doe@example.com'),
    password: z.string().trim().min(1, { message: 'Password is required' }),
  }),
  signup: z.object({
    firstName: z.string().trim().min(1, { message: 'First name is required' }),
    lastName: z.string().trim().min(1, { message: 'Last name is required' }),
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email is required' })
      .email('Invalid email format: e.g. jane.doe@example.com'),
    password: z.string().trim().min(1, { message: 'Password is required' }),
  }),
}
