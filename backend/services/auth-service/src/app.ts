import express from 'express'
import authRoutes from './routes/auth.route'
import { errorHandler } from './middlewares/error.middleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', authRoutes)

app.use(errorHandler)

export default app