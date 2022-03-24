import { bankNoteMapper } from '../constants/money-mapper'
import { BankNoteTypes } from '../types'

export const getTotal = (bankNotes: BankNoteTypes) => {
  let balance = 0
  const moneyKeys = Object.keys(
    bankNoteMapper
  ) as (keyof typeof bankNoteMapper)[]

  moneyKeys.forEach((moneyKey) => {
    balance += (bankNoteMapper?.[moneyKey] || 0) * (bankNotes?.[moneyKey] || 0)
  })

  return balance
}
