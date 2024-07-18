import type { RequestHandler } from "express";

import { logoutSchema } from "@repo/db/schema";

import { clearResponseCookies } from "../utils/clear-response-cookies";
import { deleteSessionByRefreshToken } from "../utils/delete-session-by-refresh-token";
import { isFromMobile } from "../utils/is-from-mobile";

interface Cookies {
  refreshToken?: string;
}

export const logOut: RequestHandler = async (req, res) => {
  const isMobile = isFromMobile(req);

  const tokenFromCookies = String(
    (req.cookies as Cookies | undefined)?.refreshToken,
  );
  const tokenFromBody = String((req.body as Cookies | undefined)?.refreshToken);
  const refreshToken = isMobile ? tokenFromBody : tokenFromCookies;

  try {
    const { success, error, data } = logoutSchema.safeParse({
      refreshToken,
    });
    if (!success) {
      return res.error(400, "Validation error", error.format());
    }

    await deleteSessionByRefreshToken(data.refreshToken);

    if (!isMobile) {
      clearResponseCookies(res);
    }

    res.success({ message: "logged out" });
  } catch (error) {
    res.error(500, "Internal Server Error");
  }
};
