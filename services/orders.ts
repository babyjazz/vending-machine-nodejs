import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { CustomRequest } from '../types'
import errorMessages from '../constants/errors'
import { checkErrorsValidation } from '../utils/get-errors'
import { getBalance } from '../utils/get-balance'

const prisma = new PrismaClient()

// test
const purchase = async (req: CustomRequest, res: Response) => {
  const message = checkErrorsValidation(req)
  if (message) {
    return res.status(400).json({ success: false, message })
  }

  const { productId } = req.body
  const userId = req.jwt?.userId

  const product = await prisma.products.findFirst({
    where: {
      id: productId,
    },
  })
  if (!product?.id) {
    return res.status(404).json({
      success: false,
      message: errorMessages.notFound('product'),
    })
  }
  if (product.amount === 0) {
    return res.json({
      success: false,
      message: errorMessages.outOfStock('product'),
    })
  }

  const wallet = await prisma.wallets.findFirst({
    where: {
      user_id: userId,
    },
  })

  if (!wallet?.id) {
    return res.status(400).json({
      success: false,
      message: errorMessages.notFound('wallet'),
    })
  }
  const balance = getBalance({ ...wallet, fiveHundred: wallet.five_hundred })
  console.log('debug ', balance)

  return res.json({ success: true, wallet })
}

const ordersServices = {
  purchase,
}

export default ordersServices
