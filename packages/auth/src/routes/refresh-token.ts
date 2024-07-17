import type { RequestHandler } from "express";

import { refreshTokenInputSchema } from "@repo/validators";

import { findSessionByRefreshToken } from "../utils/find-session-by-refresh-token";
import { isRefreshTokenValid } from "../utils/is-refresh-token-valid";
import { setResponseCookies } from "../utils/set-response-cookies";
import { updateSessionTokens } from "../utils/update-session-tokens";

export const refreshToken: RequestHandler = async (req, res) => {
  try {
    const { success, error, data } = refreshTokenInputSchema.safeParse(
      req.body,
    );

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

    const { accessToken, newRefreshToken } = await updateSessionTokens(
      userId,
      refreshToken,
    );

    setResponseCookies(res, accessToken, newRefreshToken);

    res.success({ accessToken, refreshToken: newRefreshToken }, 201);
  } catch (e) {
    res.error(500, "Internal Server Error");
  }
};
