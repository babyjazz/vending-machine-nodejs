import { check } from 'express-validator'
import errorMessages from '../constants/errors'

const purchase = [
  check('productId')
    .notEmpty()
    .withMessage(errorMessages.isRequired('product')),
  check('productId')
    .toInt()
    .isNumeric()
    .withMessage(errorMessages.mustBeInt('product')),
  check('ten').toInt().isNumeric().withMessage(errorMessages.mustBeInt('ten')),
]

const ordersValidators = {
  purchase,
}

export default ordersValidators
