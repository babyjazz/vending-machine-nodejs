interface WalletTypes {
  one: number
  five: number
  ten: number
  twenty: number
  fifty: number
  hundred: number
  fiveHundred: number
  thousand: number
}

const moneyMapper: WalletTypes = {
  one: 1,
  five: 5,
  ten: 10,
  twenty: 20,
  fifty: 50,
  hundred: 100,
  fiveHundred: 500,
  thousand: 1000,
}

export const getBalance = (wallet: WalletTypes) => {
  let balance = 0
  const walletkeys = Object.keys(moneyMapper) as (keyof typeof wallet)[]

  walletkeys.forEach((walletKey) => {
    balance += moneyMapper[walletKey] * wallet[walletKey]
  })

  return balance
}
