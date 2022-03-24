import { Request } from 'express'
import { validationResult } from 'express-validator'

const checkErrorsValidation = (req: Request) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return errors.array()?.[0].msg
  }
  return false
}

export { checkErrorsValidation }
