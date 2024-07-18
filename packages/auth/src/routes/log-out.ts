import type { RequestHandler } from "express";

import { logoutSchema } from "@repo/db/schema";

import { clearResponseCookies } from "../utils/clear-response-cookies";
import { deleteSessionByRefreshToken } from "../utils/delete-session-by-refresh-token";

export const logOut: RequestHandler = async (req, res) => {
  try {
    const { success, error, data } = logoutSchema.safeParse(req.body);
    if (!success) {
      return res.error(400, "Validation error", error.format());
    }

    const { refreshToken } = data;

    await deleteSessionByRefreshToken(refreshToken);

    clearResponseCookies(res);

    res.success({ message: "logged out" }, 204);
  } catch (error) {
    res.error(500, "Internal Server Error");
  }
};
