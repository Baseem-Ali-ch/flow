import jwt from "jsonwebtoken";
import { config } from "../config/env";

interface JwtPayload {
  id?: string;
  email?: string;
  role?: string;
}

export interface EmailVerificationPayload{
  id: string
}

export const _emailVerificationToken =  async(id: string) => {
  const payload: EmailVerificationPayload = {id}
  return jwt.sign(payload, config.jwtSecret, {expiresIn: "24h"})
}

export const _accessToken = async (payload: JwtPayload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
};

export const _refreshToken = async (payload: JwtPayload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
};
