import { BankNoteReverseTypes, BankNoteTypes } from '../types'

const bankNoteMapper: BankNoteTypes = {
  one: 1,
  five: 5,
  ten: 10,
  twenty: 20,
  fifty: 50,
  hundred: 100,
  fiveHundred: 500,
  thousand: 1000,
}

const bankNoteReverseMapper: BankNoteReverseTypes = {
  '1': 'one',
  '5': 'five',
  '10': 'ten',
  '20': 'twenty',
  '50': 'fifty',
  '100': 'hundred',
  '500': 'fiveHundred',
  '1000': 'thousand',
}

export { bankNoteMapper, bankNoteReverseMapper }
