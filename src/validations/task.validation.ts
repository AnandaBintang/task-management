import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(5).max(255),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  deadline: z.date(),
  userId: z.string().uuid()
})

export const updateTaskSchema = z.object({
  title: z.string().min(5).max(50).optional(),
  description: z.string().min(5).max(255).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  deadline: z.date(),
  userId: z.string().uuid()
})

export const validateCreateTask = (data: unknown) => {
  const result = taskSchema.safeParse(data)

  if (!result.success) {
    return result
  }
}

export const validateUpdateTask = (data: unknown) => {
  const result = updateTaskSchema.safeParse(data)

  if (!result.success) {
    return result
  }
}

export type TaskType = z.infer<typeof taskSchema>
export type updateTaskType = z.infer<typeof updateTaskSchema>
