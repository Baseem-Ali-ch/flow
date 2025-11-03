import express from 'express'
import cors from 'cors'
import router from './routes'
import { StatusMessages } from '../../shared/constants/httpStatusMessages'
import { errorHandler } from '../../shared/middlewares/error.middleware'

const app = express()

app.use(cors())

app.use('/api', router)

app.use((req, res, next) => {
    const error = new Error(StatusMessages.NOT_FOUND)
    next(error)
})

app.use(errorHandler)

export default app