import { Response } from 'express'
import { PrismaClient, order_status as orderStatus } from '@prisma/client'
import { CustomRequest, BankNoteTypes } from '../types'
import errorMessages from '../constants/errors'
import { checkErrorsValidation } from '../utils/get-errors'
import { getTotal } from '../utils/get-balance'
import { getChanges } from '../utils/get-changes'
import { isEnoughChange } from '../utils/is-enough-change'

const prisma = new PrismaClient()

const createOrderTx = async (
  productId: number,
  userId: number,
  status: orderStatus
) => {
  await prisma.orders.create({
    data: {
      product_id: productId,
      user_id: userId,
      quantity: 1,
      status,
    },
  })
}

const purchase = async (req: CustomRequest, res: Response) => {
  const message = checkErrorsValidation(req)
  if (message) {
    return res.status(400).json({ success: false, message })
  }

  const {
    productId,
    one,
    five,
    ten,
    twenty,
    fifty,
    hundred,
    fivehundred,
    thousand,
  } = req.body
  const moneyPaid: BankNoteTypes = {
    one,
    five,
    ten,
    twenty,
    fifty,
    hundred,
    fivehundred,
    thousand,
  }
  const userId = req.jwt?.userId || 0

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
    await createOrderTx(product.id, userId, 'out_of_stock')
    return res.json({
      success: false,
      message: errorMessages.outOfStock('product'),
    })
  }

  // 2. Check money that user paid is insufficient
  const paidTotal = getTotal(moneyPaid)
  if (product.price > paidTotal) {
    await createOrderTx(product.id, userId, 'insufficient_balance')
    return res
      .status(422)
      .json({ success: false, message: errorMessages.insufficient('balance') })
  }

  // 3. Check vending coins/notebanks have enough to change
  const availableCoins =
    (await prisma.available_coins.findFirst()) as BankNoteTypes
  const changes = getChanges(paidTotal - product.price, availableCoins)
  const isEnoughToChange = isEnoughChange(availableCoins, changes)
  if (!availableCoins || !isEnoughToChange) {
    await createOrderTx(product.id, userId, 'insufficient_change')
    return res.status(422).json({
      success: false,
      message: errorMessages.isNotEnough('change'),
    })
  }

  //  4. Process purchase
  try {
    await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        amount: product.amount - 1,
      },
    })
    await prisma.available_coins.updateMany({
      data: {
        one:
          (availableCoins?.one || 0) +
          (moneyPaid?.one || 0) -
          (changes?.one || 0),
        five:
          (availableCoins?.five || 0) +
          (moneyPaid?.five || 0) -
          (changes?.five || 0),
        ten:
          (availableCoins?.ten || 0) +
          (moneyPaid?.ten || 0) -
          (changes?.ten || 0),
        twenty:
          (availableCoins?.twenty || 0) +
          (moneyPaid?.twenty || 0) -
          (changes?.twenty || 0),
        fifty:
          (availableCoins?.fifty || 0) +
          (moneyPaid?.fifty || 0) -
          (changes?.fifty || 0),
        hundred:
          (availableCoins?.hundred || 0) +
          (moneyPaid?.hundred || 0) -
          (changes?.hundred || 0),
        fivehundred:
          (availableCoins?.fivehundred || 0) +
          (moneyPaid?.fivehundred || 0) -
          (changes?.fivehundred || 0),
        thousand:
          (availableCoins?.thousand || 0) +
          (moneyPaid?.thousand || 0) -
          (changes?.thousand || 0),
      },
    })
    await createOrderTx(product.id, userId, 'success')
  } catch (error) {
    await createOrderTx(product.id, userId, 'failure')
    return res.status(500).json({
      success: false,
      message: errorMessages.failureCreate('order'),
    })
  }

  return res.status(201).json({ success: true, data: { changes } })
}

const ordersServices = {
  purchase,
}

export default ordersServices
