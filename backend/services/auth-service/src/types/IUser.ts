export interface IUser {
    _id?: string,
    username?: string
    email: string
    phone: string
    password: string
    role: string
    isEmailVerified: boolean
    isActive: boolean
}