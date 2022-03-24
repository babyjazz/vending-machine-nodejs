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
  check('one')
    .optional()
    .toInt()
    .isNumeric()
    .withMessage(errorMessages.mustBeInt('one')),
  check('five')
    .optional()
    .toInt()
    .isNumeric()
    .withMessage(errorMessages.mustBeInt('five')),
  check('ten')
    .optional()
    .toInt()
    .isNumeric()
    .withMessage(errorMessages.mustBeInt('ten')),
  check('twenty')
    .optional()
    .toInt()
    .isNumeric()
    .withMessage(errorMessages.mustBeInt('twenty')),
  check('fifty')
    .optional()
    .toInt()
    .isNumeric()
    .withMessage(errorMessages.mustBeInt('fifty')),
  check('hundred')
    .optional()
    .toInt()
    .isNumeric()
    .withMessage(errorMessages.mustBeInt('hundred')),
  check('fivehundred')
    .optional()
    .toInt()
    .isNumeric()
    .withMessage(errorMessages.mustBeInt('fivehundred')),
  check('thousand')
    .optional()
    .toInt()
    .isNumeric()
    .withMessage(errorMessages.mustBeInt('thousand')),
]

const ordersValidators = {
  purchase,
}

export default ordersValidators
