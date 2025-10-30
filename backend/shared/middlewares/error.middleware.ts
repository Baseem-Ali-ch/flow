import {Request, Response, NextFunction, ErrorRequestHandler} from 'express'
import { StatusCodes } from '../constants/httpStatusCodes'

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)

    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    const message = err.message

    res.status(statusCode).json({
        success: false, message, stack: process.env.NODE_ENV === "development"? err.stack : undefined
    })
}