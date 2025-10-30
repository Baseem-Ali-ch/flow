import bcrypt from "bcrypt";
import logger from "../../../../shared/config/logger";

export const passwordCompare = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Pasword comparison failed ", error);
    return false;
  }
};
