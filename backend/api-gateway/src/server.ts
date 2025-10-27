import app from './app'
import {config} from './config/env'

app.listen(config.port, () => {
    console.log(`Api gateway running on ${config.port}`)
})