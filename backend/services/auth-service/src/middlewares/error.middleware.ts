import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../../../../shared/utils/AppError";
import { StatusCodes } from "../../../../shared/constants/httpStatusCodes";
import { StatusMessages } from "../../../../shared/constants/httpStatusMessages";

export const errorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("[Auth-Service] Error Handler:", error.message);

  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: StatusMessages.INTERNAL_SERVER_ERROR,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};
