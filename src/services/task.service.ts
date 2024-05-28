import { type TaskType } from '../validations/task.validation'
import prisma from '../utils/client'

export const getAll = async () => {
  return await prisma.tasks.findMany()
}

export const create = async (data: TaskType) => {
  return await prisma.tasks.create({
    data
  })
}

export const findUnique = async (id: string) => {
  return await prisma.tasks.findUnique({
    where: {
      id
    }
  })
}

export const update = async (id: string, data: TaskType) => {
  return await prisma.tasks.update({
    where: {
      id
    },
    data
  })
}
