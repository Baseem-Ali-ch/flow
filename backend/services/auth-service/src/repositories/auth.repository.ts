import { JwtPayload } from "jsonwebtoken";
import logger from "../../../../shared/config/logger";
import { User } from "../models/user";
import { IUser } from "../types/IUser";

export const findByUsername = async (
  username: string
): Promise<IUser | null> => {
  try {
    return await User.findOne({ username });
  } catch (error) {
    logger.error("[Repository] Find by Username ", error);
    return null;
  }
};

export const findByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    logger.error("[Repository] Find by Email ", error);
    return null;
  }
};

export const findById = async (id: string | JwtPayload): Promise<IUser | null> => {
  try {
    return await User.findOne({ _id: id });
  } catch (error) {
    logger.error("[Repository] Find by Id ", error);
    return null;
  }
};

export const createUser = async (
  username: string,
  email: string,
  phone: string,
  hashedPassword: string
): Promise<IUser | null> => {
  try {
    return await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });
  } catch (error) {
    logger.error("[Repository] Create User ", error);
    return null;
  }
};

export const updateUser = async (id: string) => {
  try {
    return await User.updateOne(
      { _id: id },
      { $set: { isVerified: true } }
    );
  } catch (error) {
    logger.error("[Repository] Update User ", error);
    return null;
  }
};
