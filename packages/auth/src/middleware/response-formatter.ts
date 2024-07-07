import { Request, Response, NextFunction } from "express";
import { ApiResponse, ApiError } from "../types/api-response";

export const responseFormatter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = function <T>(data: T, statusCode = 200): Response {
    const response: ApiResponse<T> = {
      status: "success",
      data: data,
      error: null,
    };
    return res.status(statusCode).json(response);
  };

  res.error = function (code, message, details): Response {
    const error: ApiError = {
      code: code,
      message: message,
      details: details,
    };
    const response: ApiResponse<null> = {
      status: "error",
      data: null,
      error: error,
    };
    return res.status(code).json(response);
  };

  next();
};
