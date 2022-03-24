import express from 'express'
import isAuthorized from '../middlewares/auth'
import ordersServices from '../services/orders'
import ordersValidators from '../validators/orders'

const router = express.Router()

router.post(
  '/purchase',
  isAuthorized,
  ...ordersValidators.purchase,
  ordersServices.purchase
)

export default router
