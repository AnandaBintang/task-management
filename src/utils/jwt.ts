import 'dotenv/config'
import jsonWebToken from 'jsonwebtoken'
import { UserToken } from '../types/userToken.types'

export const generateAccessToken = (user: UserToken): string => {
  return jsonWebToken.sign(user, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn:
      process.env.ACCESS_TOKEN_EXPIRES != null
        ? String(process.env.ACCESS_TOKEN_EXPIRES)
        : '1800s'
  })
}

export const generateRefreshToken = (user: UserToken): string => {
  return jsonWebToken.sign(user, String(process.env.REFRESH_TOKEN_SECRET), {
    expiresIn:
      process.env.REFRESH_TOKEN_EXPIRES != null
        ? String(process.env.REFRESH_TOKEN_EXPIRES)
        : '1800s'
  })
}

export const verifyAccessToken = (token: string): any => {
  try {
    return jsonWebToken.verify(token, String(process.env.ACCESS_TOKEN_SECRET))
  } catch (error: any) {
    return null
  }
}

export const verifyRefreshToken = (token: string): any => {
  try {
    return jsonWebToken.verify(token, String(process.env.REFRESH_TOKEN_SECRET))
  } catch (error: any) {
    return null
  }
}
