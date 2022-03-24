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

async function main() {
  console.log(`Start seeding ...`)
  for (let i = 0; i < userData.length; i++) {
    const u = userData[i]
    await prisma.users.create({
      data: u,
    })
  }
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
