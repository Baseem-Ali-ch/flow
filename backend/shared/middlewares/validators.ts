import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../constants/httpStatusCodes";

export function loginValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  const errors = [];

  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format");
    }
  }

  if (!password || password.trim() === "") {
    errors.push("Password is required");
  } else {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{6,}$/;
    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must be contain upper case, number, symbol, minimum length 6 char"
      );
    }
  }

  if (errors.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

  next();
}
