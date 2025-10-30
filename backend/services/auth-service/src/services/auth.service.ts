import logger from "../../../../shared/config/logger";
import { findByEmail } from "../repositories/auth.repository";
import { passwordCompare } from "../utils/password";
import { _accessToken, _refreshToken } from "../utils/token";

export const loginService = async (email: string, password: string) => {
  try {
    const user = await findByEmail(email);
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordMatch = await passwordCompare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid Credentials");
    }

    const accessToken = await _accessToken(user);
    const refreshToken = await _refreshToken(user);

    return { user, accessToken, refreshToken };
  } catch (error) {
    logger.error("[Service] Login ", error);
  }
};
