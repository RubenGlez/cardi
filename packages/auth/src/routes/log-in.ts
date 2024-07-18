import type { RequestHandler } from "express";

import { loginSchema } from "@repo/db/schema";

import { createSession } from "../utils/create-session";
import { findUserByEmail } from "../utils/find-user-by-email";
import { isPasswordValid } from "../utils/is-password-valid";
import { setResponseCookies } from "../utils/set-response-cookies";

export const logIn: RequestHandler = async (req, res) => {
  try {
    const { success, error, data } = loginSchema.safeParse(req.body);
    if (!success) {
      return res.error(400, "Validation error", error.format());
    }

    const { email, password } = data;

    const user = await findUserByEmail(email);
    if (!user || !(await isPasswordValid(password, user.password))) {
      return res.error(401, "Unauthorized");
    }

    const { accessToken, refreshToken } = await createSession(user.id);

    setResponseCookies(res, refreshToken);

    res.success({ accessToken });
  } catch (error) {
    res.error(500, "Internal Server Error");
  }
};
