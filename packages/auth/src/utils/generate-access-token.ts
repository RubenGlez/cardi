import jwt from "jsonwebtoken";

import type { AuthUser } from "../types/auth-user";
import { env } from "../../env";

export function generateAccessToken(user: AuthUser) {
  return jwt.sign(user, env.AUTH_API_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
