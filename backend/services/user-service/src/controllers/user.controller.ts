import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "../../../../shared/constants/httpStatusCodes";
import { StatusMessages } from "../../../../shared/constants/httpStatusMessages";
import logger from "../../../../shared/config/logger";
import { userService } from "../services/user.service";

export const users = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userService();
    res.status(StatusCodes.OK).json({ message: StatusMessages.OK, data });
  } catch (error) {
    logger.error("[Controller] Users: ", error);
    next(error);
  }
};
