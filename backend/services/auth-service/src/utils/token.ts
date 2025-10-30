import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { config } from "../config/env";

interface JwtPayload {
  id?: string;
  email?: string;
  role?: string;
}

export const _accessToken = async (payload: JwtPayload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
};

export const _refreshToken = async (payload: JwtPayload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
};
