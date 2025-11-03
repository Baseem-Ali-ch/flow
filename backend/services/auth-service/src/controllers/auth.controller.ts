import { NextFunction, Request, Response } from "express";
import { StatusMessages } from "../../../../shared/constants/httpStatusMessages";
import { StatusCodes } from "../../../../shared/constants/httpStatusCodes";
import {
  loginService,
  registerService,
  verifyEmailService,
} from "../services/auth.service";
import logger from "../../../../shared/config/logger";
import { AppError } from "../../../../shared/utils/AppError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.status(StatusCodes.OK).json({ message: StatusMessages.OK, data });
  } catch (error) {
    logger.error("[Controller] Login: ", error);
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, phone, password } = req.body;
    await registerService(username, email, phone, password);
    res.status(StatusCodes.OK).json({ message: StatusMessages.OK });
  } catch (error) {
    logger.error("[Controller] Register ", error);
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      throw new AppError("Invalid or missing token", StatusCodes.BAD_REQUEST);
    }
    const data = await verifyEmailService(token);
    res.status(StatusCodes.OK).json({ message: StatusMessages.OK, data });
  } catch (error) {
    logger.error("[Controller] Email Verify ", error);
  }
};
