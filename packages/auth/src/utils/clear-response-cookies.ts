import type { Response } from "express";

export const clearResponseCookies = (res: Response) => {
  res.clearCookie("refreshToken");
};
