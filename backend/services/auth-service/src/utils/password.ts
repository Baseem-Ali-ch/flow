import bcrypt from "bcrypt";
import { config } from "../config/env";

export const comparePassword = async (
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

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(Number(config.saltRounds));
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
};
