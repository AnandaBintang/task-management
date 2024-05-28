import {
  type UserType,
  type UpdateUserType
} from '../validations/user.validation'
import prisma from '../utils/client'
import bcrypt from 'bcrypt'

export const getAll = async () => {
  return await prisma.users.findMany()
}

export const findUnique = async (email: string) => {
  return await prisma.users.findUnique({
    where: {
      email
    }
  })
}

export const create = async (data: UserType) => {
  return await prisma.users.create({
    data
  })
}

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword)
}
