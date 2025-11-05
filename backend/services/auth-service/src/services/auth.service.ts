import { StatusCodes } from "../../../../shared/constants/httpStatusCodes";
import {
  createUser,
  findByEmail,
  findById,
  findByUsername,
  updateUser,
} from "../repositories/auth.repository";
import { comparePassword, hashPassword } from "../utils/password";
import {
  _accessToken,
  _emailVerificationToken,
  _refreshToken,
  EmailVerificationPayload,
} from "../utils/token";
import { AppError } from "../../../../shared/utils/AppError";
import { sendVerificationEmail } from "../utils/sendEmail";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export const loginService = async (email: string, password: string) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new AppError("Invalid Credentials", StatusCodes.BAD_REQUEST);
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Invalid Credentials", StatusCodes.BAD_REQUEST);
  }

  const accessToken = await _accessToken(user);
  const refreshToken = await _refreshToken(user);

  return { user, accessToken, refreshToken };
};

export const registerService = async (
  username: string,
  email: string,
  phone: string,
  password: string
) => {
  const existingUsername = await findByUsername(username);
  if (existingUsername) {
    throw new AppError("Username is already taken", StatusCodes.CONFLICT);
  }

  const existingEmail = await findByEmail(email);
  if (existingEmail) {
    throw new AppError("Email is already taken", StatusCodes.CONFLICT);
  }

  const hashedPassword = await hashPassword(password);
  const user = await createUser(username, email, phone, hashedPassword);
  if (!user) {
    throw new AppError(
      "Failed to create user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  const emailVerificationToken = await _emailVerificationToken(user._id!);
  const emailVerifyUrl = `${config.emailVerifyUrl}?token=${emailVerificationToken}`;

  await sendVerificationEmail(user.email, emailVerifyUrl);
};

export const verifyEmailService = async (token: string) => {
  const decoded = jwt.verify(token, config.jwtSecret) as EmailVerificationPayload;

  const user = await findById(decoded.id);
  if (!user) {
    throw new AppError("Not found", StatusCodes.NOT_FOUND);
  }
  if (user.isEmailVerified) {
    throw new AppError("Email already verified", StatusCodes.BAD_REQUEST);
  }

  const result = await updateUser(user._id!);

  const payload = {
    id: user._id!.toString(),
    email: user.email,
    role: user.role,
  };
  const accessToken = await _accessToken(payload);
  const refreshToken = await _refreshToken(payload);

  return { result, accessToken, refreshToken };
};
