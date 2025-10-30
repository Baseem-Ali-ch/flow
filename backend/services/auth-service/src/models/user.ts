import mongoose from "mongoose";
import { IUser } from "../types/IUser";

const userSchema = new mongoose.Schema<IUser>({
    
})

export const User = mongoose.model<IUser>('User', userSchema)