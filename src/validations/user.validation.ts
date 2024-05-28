import { z } from 'zod'

export const UserSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  name: z
    .string({
      message: 'Name is required',
      invalid_type_error: 'Name must be a string'
    })
    .min(2)
    .max(50),
  password: z
    .string({
      message: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
    .min(8)
    .max(50),
  role: z.enum(['USER', 'ADMIN']).default('USER')
})

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).max(50).optional(),
  password: z.string().min(8).max(50).optional(),
  role: z.enum(['USER', 'ADMIN']).optional()
})

export const validateCreateUser = (data: unknown) => {
  const result = UserSchema.safeParse(data)

  if (!result.success) {
    return result
  }
}

export const validateUpdateUser = (data: unknown) => {
  const result = updateUserSchema.safeParse(data)

  if (!result.success) {
    return result
  }
}

export const validateLogin = (data: unknown) => {
  const result = UserSchema.pick({ email: true, password: true }).safeParse(
    data
  )

  if (!result.success) {
    return result
  }
}

export type UserType = z.infer<typeof UserSchema>
export type UpdateUserType = z.infer<typeof updateUserSchema>
