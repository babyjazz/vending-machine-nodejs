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
  await prisma.users.deleteMany()
  await prisma.available_coins.deleteMany()
  console.log('Cleared data every tables')

  console.log(`Start seeding ...`)
  // Create users
  for (let i = 0; i < userData.length; i++) {
    const data = userData[i]
    await prisma.users.create({
      data,
    })
  }
  // Create products
  for (let i = 0; i < productData.length; i++) {
    const data = productData[i]
    await prisma.products.create({
      data,
    })
  }
  // Create vending machine available coins
  await prisma.available_coins.create({
    data: {
      one: 20,
      five: 20,
      ten: 20,
      twenty: 20,
      fifty: 20,
      hundred: 20,
      five_hundred: 20,
      thousand: 20,
    },
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
