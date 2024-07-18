import type { RequestHandler } from "express";

import { refreshTokenSchema } from "@repo/db/schema";

import { findSessionByRefreshToken } from "../utils/find-session-by-refresh-token";
import { isFromMobile } from "../utils/is-from-mobile";
import { isRefreshTokenValid } from "../utils/is-refresh-token-valid";
import { setResponseCookies } from "../utils/set-response-cookies";
import { updateSessionTokens } from "../utils/update-session-tokens";

export const refreshToken: RequestHandler = async (req, res) => {
  const isMobile = isFromMobile(req);

  try {
    const { success, error, data } = refreshTokenSchema.safeParse(req.body);

    if (!success) {
      return res.error(400, "Validation error", error.format());
    }

    const { userId, refreshToken } = data;

    const session = await findSessionByRefreshToken(refreshToken);
    if (!session) {
      return res.error(403, "Unauthorized");
    }

    if (!isRefreshTokenValid(refreshToken)) {
      return res.error(403, "Unauthorized");
    }

    const { accessToken, newRefreshToken } = await updateSessionTokens({
      userId,
      refreshToken,
    });

    if (isMobile) {
      res.success({ accessToken, refreshToken: newRefreshToken });
    } else {
      setResponseCookies(res, newRefreshToken);
      res.success({ accessToken });
    }
  } catch (e) {
    res.error(500, "Internal Server Error");
  }
};
