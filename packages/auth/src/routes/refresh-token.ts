import type { RequestHandler } from "express";

import { refreshTokenSchema } from "@repo/db/schema";

import { findSessionByRefreshToken } from "../utils/find-session-by-refresh-token";
import { isFromMobile } from "../utils/is-from-mobile";
import { isRefreshTokenValid } from "../utils/is-refresh-token-valid";
import { updateSessionTokens } from "../utils/update-session-tokens";

export const refreshToken: RequestHandler = async (req, res) => {
  try {
    const isMobile = isFromMobile(req);

    // Validate the request body
    const { success, error, data } = refreshTokenSchema.safeParse(req.body);

    if (!success) {
      return res
        .status(400)
        .json({ error: "Validation Error", details: error.format() });
    }

    const { userId, refreshToken } = data;

    // Find the session by refresh token
    const session = await findSessionByRefreshToken(refreshToken);
    if (!session || !isRefreshTokenValid(refreshToken)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Update session tokens
    const { accessToken, newRefreshToken } = await updateSessionTokens({
      userId,
      refreshToken,
    });

    // Send response based on the device type
    if (isMobile) {
      return res
        .status(200)
        .json({ accessToken, refreshToken: newRefreshToken });
    } else {
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
