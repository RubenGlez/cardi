import type { CookieOptions, Response } from "express";

export const setResponseCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
};
