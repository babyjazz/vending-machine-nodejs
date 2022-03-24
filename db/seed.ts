/* eslint-disable no-await-in-loop */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const userData = [
  {
    username: 'test1',
    password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
  },
  {
    username: 'test2',
    password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
  },
]

const productData = [
  {
    name: 'Coke',
    price: 13,
    amount: 7,
  },
  {
    name: 'Bento',
    price: 25,
    amount: 8,
  },
  {
    name: 'Lays',
    price: 20,
    amount: 10,
  },
]

async function main() {
  console.log('Clear data before seed ...')
  await prisma.orders.deleteMany()
  await prisma.products.deleteMany()
  await prisma.wallets.deleteMany()
  await prisma.users.deleteMany()
  console.log('Cleared data every tables')

  console.log(`Start seeding ...`)
  // Create users
  for (let i = 0; i < userData.length; i++) {
    const data = userData[i]
    await prisma.users.create({
      data,
    })
  }
  // Create wallets
  for (let i = 0; i < productData.length; i++) {
    const data = productData[i]
    await prisma.products.create({
      data,
    })
  }
  // Create wallet per user
  const users = await prisma.users.findMany()
  users.forEach(async (user) => {
    await prisma.wallets.create({
      data: {
        user_id: user.id,
        one: 20,
        five: 20,
        ten: 20,
        twenty: 20,
        fifty: 20,
        hundred: 20,
        five_hundred: 20,
        thounsand: 20,
      },
    })
  })
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
