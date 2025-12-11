import logger from "../../../../shared/config/logger";
import { User } from "../models/user";

export const findUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    logger.error('[Repository] Find Users ', error)
  }
};
