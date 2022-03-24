import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import errorMessages from '../constants/errors'
import { AUTH_SECRET } from '../config/env'

const prisma = new PrismaClient()

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await prisma.users.findFirst({
    where: { username },
  })
  const authenticated = bcrypt.compareSync(password, user?.password ?? '')

  if (!user || !authenticated) {
    res
      .status(401)
      .json({ success: false, message: errorMessages.invalidCredential() })
  } else {
    const accessToken = jwt.sign(
      { userId: user.id, username: user.username },
      AUTH_SECRET
    )
    // TODO find the way to remove password in correct way
    // eslint-disable-next-line
    // @ts-ignore
    delete user.password

    res.json({ success: true, data: { ...user, accessToken } })
  }
}

const userServices = {
  login,
}

export default userServices
