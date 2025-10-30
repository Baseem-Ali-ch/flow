import {config} from './config/env'
import app from './app'
import connectDB from '../../../shared/config/db'

connectDB()

app.listen(config.port, () => {
    console.log(`Auth service running on ${config.port}`)
})