import { z } from 'zod'

export const validation = {
  login: z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email is required' })
      .email('Invalid email format: e.g. jane.doe@example.com'),
    password: z.string().trim().min(1, { message: 'Password is required' }),
    code: z.optional(z.string().trim()),
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
  resetPassword: z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email is required' })
      .email('Invalid email format: e.g. jane.doe@example.com'),
  }),
  newPassword: z
    .object({
      password: z.string().trim().min(1, { message: 'Password is required' }),
      confirm_password: z
        .string()
        .trim()
        .min(1, { message: 'Password confirmation is required' }),
    })
    .refine(data => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ['confirm_password'],
    }),
  settings: z.object({
    name: z.optional(z.string().trim()),
  }),
}
