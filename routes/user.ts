import express, { Request, Response } from 'express'
import userServices from '../services/user'

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req: Request, res: Response) => {
  res.json({ user: true })
})

router.post('/login', userServices.login)

export default router
