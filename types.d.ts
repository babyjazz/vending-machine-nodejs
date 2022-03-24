import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

interface JwtDecoded extends JwtPayload {
  userId?: number
  username?: string
}

interface CustomRequest extends Request {
  jwt?: JwtDecoded
}

interface BankNoteTypes {
  one?: number
  five?: number
  ten?: number
  twenty?: number
  fifty?: number
  hundred?: number
  fiveHundred?: number
  thousand?: number
}

interface BankNoteReverseTypes {
  1?: string
  5?: string
  10?: string
  20?: string
  50?: string
  100?: string
  500?: string
  1000?: string
}
