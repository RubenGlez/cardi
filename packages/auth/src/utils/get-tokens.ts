import type { Request } from "express";

import type { WithCookies } from "../types/with-cookies";
import { isFromMobile } from "./is-from-mobile";

export const getTokens = (req: WithCookies<Request>) => {
  const isMobile = isFromMobile(req);

  const accessToken = req.headers.authorization?.split(" ")[1];

  const refreshToken = isMobile
    ? req.headers["x-refresh-token"]
    : req.cookies.refreshToken;

  return { accessToken, refreshToken };
};
