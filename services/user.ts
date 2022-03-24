import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await prisma.users.findFirst({
    where: { username },
  })

  const authenticated = bcrypt.compareSync(password, user?.password ?? '')
  if (!user || !authenticated) {
    res.status(401).json({ success: false, message: 'invalid_credential' })
  } else {
    res.json({ success: true, data: user })
  }
}

const userServices = {
  login,
}

export default userServices
