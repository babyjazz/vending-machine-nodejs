import express from 'express'
import userServices from '../services/user'

const router = express.Router()

router.post('/login', userServices.login)

export default router
