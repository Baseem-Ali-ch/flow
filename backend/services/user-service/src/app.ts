import express from 'express'
import { errorHandler } from './middlewares/error.middleware'
import userRoutes from './routes/user.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', userRoutes)

app.use(errorHandler)

export default app