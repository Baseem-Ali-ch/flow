import dotenv from 'dotenv'
dotenv.config()

export const config = {
    port: process.env.PORT!,
    jwtSecret: process.env.JWT_SECRET!,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
    saltRounds : process.env.SALT_ROUNDS!,
    emailVerifyUrl: process.env.EMAIL_VERIFY_URL!,
    smtpHost: process.env.SMTP_HOST!,  
    smtpPort: process.env.SMTP_PORT!,
    smtpUser: process.env.SMTP_USER!,
    smtpPass: process.env.SMTP_PASS!
}