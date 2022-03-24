import { BankNoteTypes } from '../types'

const isEnoughChange = (
  availableCoins: BankNoteTypes,
  changes: BankNoteTypes
) => {
  const isAllEnough = Object.keys(changes).every(
    (bankNote) => availableCoins[bankNote] >= (changes[bankNote] || 0)
  )

  return isAllEnough
}

export { isEnoughChange }
