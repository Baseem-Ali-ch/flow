import nodemailer, {Transporter} from 'nodemailer'
import { config } from './env'

export const transporter: Transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: true,
    auth: {
        user: config.smtpUser,
        pass: config.smtpPass
    }
})