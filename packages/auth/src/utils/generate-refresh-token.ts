import jwt from "jsonwebtoken";

import type { AuthUser } from "../types/auth-user";
import { env } from "../env";

export function generateRefreshToken(user: AuthUser) {
  return jwt.sign(user, env.AUTH_API_REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
}
