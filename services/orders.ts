import { Response } from 'express'
import { PrismaClient, order_status as orderStatus } from '@prisma/client'
import { CustomRequest, BankNoteTypes } from '../types'
import errorMessages from '../constants/errors'
import { checkErrorsValidation } from '../utils/get-errors'
import { getTotal } from '../utils/get-balance'

const prisma = new PrismaClient()

const purchase = async (req: CustomRequest, res: Response) => {
  const message = checkErrorsValidation(req)
  if (message) {
    return res.status(400).json({ success: false, message })
  }
  let purchaseStatus: orderStatus = 'failure'

  const { productId, ten } = req.body
  const moneyPaid: BankNoteTypes = { ten }
  const userId = req.jwt?.userId

  // 1. Check product is out of stock
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

  // 2. Check money that user paid is insufficient
  const paidTotal = getTotal(moneyPaid)
  if (product.price > paidTotal) {
    return res
      .status(422)
      .json({ success: false, message: errorMessages.insufficient })
  }
  purchaseStatus = 'insufficient_balance'

  // 3. Check vending coins/notebanks have enough to change
  const availableCoins = await prisma.available_coins.findFirst()
  if (availableCoins) {
    console.log('debug ', availableCoins)
  }

  // process purchase
  // try {
  //   await prisma.wallets.update({
  //     where: {
  //       id: wallet.id,
  //     },
  //     data: {
  //       ...(wallet.ten - ten > 0 ? { ten: wallet.ten - ten } : { ten: 0 }),
  //     },
  //   })
  //   await prisma.products.update({
  //     where: {
  //       id: product.id,
  //     },
  //     data: {
  //       amount: product.amount - 1,
  //     },
  //   })
  //   purchaseStatus = 'success'
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: errorMessages.failureCreate('order'),
  //   })
  // }

  await prisma.orders.create({
    data: {
      product_id: product.id,
      user_id: userId,
      quantity: 1,
      status: purchaseStatus,
    },
  })

  return res.status(201).json({ success: true, data: { changes: { five: 1 } } })
}

const ordersServices = {
  purchase,
}

export default ordersServices
