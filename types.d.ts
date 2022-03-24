import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

interface JwtDecoded extends JwtPayload {
  userId?: number
  username?: string
}

interface CustomRequest extends Request {
  jwt?: JwtDecoded
}
