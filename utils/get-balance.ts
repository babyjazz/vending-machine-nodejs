import moneyMapper from '../constants/money-mapper'
import { BankNoteTypes } from '../types'

export const getTotal = (bankNotes: BankNoteTypes) => {
  let balance = 0
  const moneyKeys = Object.keys(moneyMapper) as (keyof typeof moneyMapper)[]

  moneyKeys.forEach((moneyKey) => {
    balance += (moneyMapper?.[moneyKey] || 0) * (bankNotes?.[moneyKey] || 0)
  })

  return balance
}
