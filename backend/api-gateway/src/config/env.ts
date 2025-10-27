import dotenv from 'dotenv'
dotenv.config()

export const config = {
    port: process.env.PORT!,
    authServiceUrl: process.env.AUTH_SERVICE_URL!
}