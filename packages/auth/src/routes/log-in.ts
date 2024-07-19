import type { RequestHandler } from "express";

import { loginSchema } from "@repo/db/schema";

import { createSession } from "../utils/create-session";
import { findUserByEmail } from "../utils/find-user-by-email";
import { isFromMobile } from "../utils/is-from-mobile";
import { isPasswordValid } from "../utils/is-password-valid";

export const logIn: RequestHandler = async (req, res) => {
  try {
    const isMobile = isFromMobile(req);

    // Validate the request body
    const { success, error, data } = loginSchema.safeParse(req.body);
    if (!success) {
      return res
        .status(400)
        .json({ error: "Validation Error", details: error.format() });
    }

    const { email, password } = data;

    // Find the user by email
    const user = await findUserByEmail(email);
    if (!user || !(await isPasswordValid(password, user.password))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Create session and generate tokens
    const { accessToken, refreshToken } = await createSession(user.id);

    // Send response based on the device type
    if (isMobile) {
      return res.status(200).json({ accessToken, refreshToken });
    } else {
      res.cookie("refreshToken", refreshToken, {
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
