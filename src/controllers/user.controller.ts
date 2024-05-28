import { type NextFunction, type Request, type Response } from 'express'
import {
  type UserType,
  validateCreateUser,
  validateLogin
} from '../validations/user.validation'
import {
  getAll,
  findUnique,
  create,
  comparePassword
} from '../services/user.service'
import { encryptPassword } from '../utils/bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt'

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAll()
    res.status(200).json({
      error: null,
      message: 'Get all users successfully',
      data
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/user.controller.ts: getUsers - ' +
          error.message
      )
    )
  }
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = validateCreateUser(req.body)
    if (data) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid data',
        data
      })
    }

    const { email, name, password, role } = req.body
    const user = await findUnique(email)
    if (user) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'User already exists'
      })
    }

    const hashedPassword = await encryptPassword(password)
    const userData: UserType = {
      email,
      name,
      password: hashedPassword,
      role
    }

    const newUser = await create(userData)

    return res.status(201).json({
      error: null,
      message: 'User created successfully',
      data: {
        user: newUser
      }
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/user.controller.ts: registerUser - ' +
          error.message
      )
    )
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = validateLogin(req.body)
    if (data) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid data',
        data
      })
    }

    const { email, password } = req.body
    const user = await findUnique(email)
    if (!user) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'User not found'
      })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid password'
      })
    }

    const { password: _, ...userWithoutPassword } = user
    const accessToken = generateAccessToken(userWithoutPassword)
    const refreshToken = generateRefreshToken(userWithoutPassword)

    return res.status(200).json({
      error: null,
      message: 'User logged in successfully',
      data: {
        user,
        accessToken,
        refreshToken
      }
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/user.controller.ts: login - ' + error.message
      )
    )
  }
}
