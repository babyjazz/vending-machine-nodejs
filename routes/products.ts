import express from 'express'
import productServices from '../services/products'

const router = express.Router()

router.get('/', productServices.getProducts)

export default router
