interface ChangesTypes {
  [key: string]: number
}

const getChanges = (amount: number, coins: Array<number>) => {
  const changes: ChangesTypes = {}

  for (let i = 0; amount > 0 && i < coins.length; i++) {
    const value = coins[i]

    if (value <= amount) {
      changes[value] = Math.floor(amount / value)
      amount -= value * changes[value]
    }
  }

  return changes
}

export { getChanges }
