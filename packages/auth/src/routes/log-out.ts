import type { RequestHandler } from "express";

import { logoutSchema } from "@repo/db/schema";

import { deleteSessionByRefreshToken } from "../utils/delete-session-by-refresh-token";
import { getTokens } from "../utils/get-tokens";

export const logOut: RequestHandler = async (req, res) => {
  try {
    const { refreshToken } = getTokens(req);

    // Validate the refresh token
    const { success, error, data } = logoutSchema.safeParse({ refreshToken });
    if (!success) {
      return res
        .status(400)
        .json({ error: "Validation Error", details: error.format() });
    }

    // Delete the session associated with the refresh token
    await deleteSessionByRefreshToken(data.refreshToken);

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // Respond with a success message
    return res.status(200).json({ message: "Logout done" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
