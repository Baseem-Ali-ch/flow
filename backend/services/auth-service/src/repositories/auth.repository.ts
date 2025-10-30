import logger from "../../../../shared/config/logger";
import { User } from "../models/user";
import { IUser } from "../types/IUser";

export const findByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    logger.error("[Repository] Login ", error);
    return null;
  }
};
