import { findUsers } from "../repositories/user.repository"

export const userService = async() => {
    return await findUsers()
}