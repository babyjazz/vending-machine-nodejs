import {
  bankNoteMapper,
  bankNoteReverseMapper,
} from '../constants/money-mapper'
import { BankNoteTypes } from '../types'

interface ChangesTypes {
  [key: string]: number
}

const getChanges = (amount: number, bankNotes: BankNoteTypes) => {
  const changes: ChangesTypes = {}
  const bankNotesArray = Object.keys(bankNotes)
    .map((bankNote) => bankNoteMapper?.[bankNote] || 0)
    .sort()
    .reverse()

  for (let i = 0; amount > 0 && i < bankNotesArray.length; i++) {
    const value = bankNotesArray[i]

    if (value <= amount) {
      changes[value] = Math.floor(amount / value)
      amount -= value * changes[value]
    }
  }

  const mappedChanges = Object.keys(changes).reduce(
    (prev, curr) => ({
      ...prev,
      [bankNoteReverseMapper?.[curr]]: changes[curr],
    }),
    {}
  )

  return mappedChanges
}

export { getChanges }
