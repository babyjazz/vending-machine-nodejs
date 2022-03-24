import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.products.findMany()
  return res.json({ success: true, data: products })
}

const productServices = {
  getProducts,
}

export default productServices
