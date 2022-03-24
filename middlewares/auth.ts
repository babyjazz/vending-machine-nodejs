import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AUTH_SECRET } from '../config/env'
import errorMessages from '../constants/errors'
import { CustomRequest, JwtDecoded } from '../types'

const isAuthorized = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers
  const token = authorization?.split('Bearer')?.[1].trim() || ''
  try {
    const decoded = jwt.verify(token, AUTH_SECRET) as JwtDecoded
    req.jwt = decoded
    return next()
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: errorMessages.invalidCredential() })
  }
}

export default isAuthorized
