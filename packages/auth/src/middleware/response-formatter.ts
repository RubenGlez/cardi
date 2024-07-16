import type { RequestHandler } from "express";

import type { ApiError, ApiResponse } from "../types/api-response";

export const responseFormatter: RequestHandler = (req, res, next) => {
  res.success = function <T>(data: T, statusCode = 200) {
    const response: ApiResponse<T> = {
      status: "success",
      data: data,
      error: null,
    };
    return res.status(statusCode).json(response);
  };

  res.error = function (code, message, details) {
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
