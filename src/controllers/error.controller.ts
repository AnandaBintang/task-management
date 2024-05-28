import { type NextFunction, type Request, type Response } from 'express'
import { verifyAccessToken } from '../utils/jwt'
import logger from '../utils/winston'

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = err.message.split(' - ')[1]
  logger.error(err)
  res.status(500).json({
    error: message,
    message: 'Internal server error',
    data: null
  })
}

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Pages not found',
    data: null
  })
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (token === undefined) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'You need to login first!',
      data: null
    })
  }

  const user = verifyAccessToken(String(token))
  if (user === null) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid token',
      data: null
    })
  }

  next()
}
