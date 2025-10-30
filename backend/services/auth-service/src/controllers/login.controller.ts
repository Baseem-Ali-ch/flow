import { NextFunction, Request, Response } from "express";
import { StatusMessages } from "../../../../shared/constants/httpStatusMessages";
import { StatusCodes } from "../../../../shared/constants/httpStatusCodes";
import { loginService } from "../services/auth.service";
import logger from "../../../../shared/config/logger";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {    
    const { email, password } = req.body;
    const user = await loginService(email, password);
    res.status(StatusCodes.OK).json({message: StatusMessages.OK, user});
  } catch (error) {
    logger.error("[Controller] Login: ", error);
    next(error);
  }
};
