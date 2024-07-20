import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

import { decodeAccessToken } from "./decode-access-token";

export const getSession = (
  req: CreateExpressContextOptions["req"],
  isMobile: boolean,
) => {
  const accessToken = req.headers.authorization?.split(" ")[1] ?? "";

  const refreshToken =
    (isMobile
      ? req.headers["x-refresh-token"]?.toString()
      : (req.cookies as { refreshToken?: string }).refreshToken) ?? "";

  const decodedToken = decodeAccessToken(accessToken);

  return { accessToken, refreshToken, userId: decodedToken?.id };
};
