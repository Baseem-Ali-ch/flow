import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../constants/httpStatusCodes";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex =
  /^\+?[1-9]\d{0,2}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{6,}$/;
const userNameRegex = /^[a-zA-Z0-9_]{4,}$/;

export function loginValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let errors: string[] = [];
    const { email, password } = req.body;

    if (!email || email.trim() === "") {
      errors.push("Email is required");
    } else {
      if (!emailRegex.test(email)) {
        errors.push("Invalid email format");
      }
    }

    if (!password || password.trim() === "") {
      errors.push("Password is required");
    } else {
      if (!passwordRegex.test(password)) {
        errors.push(
          "Password must contain upper case, number, symbol, minimum length 6 char"
        );
      }
    }

    if (errors.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
    return next();
  } catch (error) {
    console.error("Login validation error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: ["Validation error occurred"],
    });
  }
}

export function registerValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let errors: string[] = [];
    const { username, email, phone, password } = req.body;
    if (!username || username.trim() === "") {
      errors.push("Username is required");
    } else {
      if (!userNameRegex.test(username)) {
        errors.push("Username should be at least 4 characters");
      }
    }

    if (!email || email.trim() === "") {
      errors.push("Email is required");
    } else {
      if (!emailRegex.test(email)) {
        errors.push("Invalid email format");
      }
    }

    if (!phone || phone.trim() === "") {
      errors.push("Phone number is required");
    } else {
      if (!phoneRegex.test(phone)) {
        errors.push("Invalid phone number format");
      }
    }

    if (!password || password.trim() === "") {
      errors.push("Password is required");
    } else {
      if (!passwordRegex.test(password)) {
        errors.push(
          "Password should be 6 length, contain uppercase, number, symbol"
        );
      }
    }

    if (errors.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
    return next();
  } catch (error) {
    console.error("Register validation error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: ["Validation error occurred"],
    });
  }
}
