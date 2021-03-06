import express from 'express'
import cors from 'cors'
import userRouter from './routes/user'
import ordersRouter from './routes/orders'
import productsRouter from './routes/products'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (_, res) => {
  res.json({ success: true })
})

app.use('/user', userRouter)

app.use('/order', ordersRouter)

app.use('/products', productsRouter)

app.use((req, res) => {
  res.status(404).render('404.jade')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
