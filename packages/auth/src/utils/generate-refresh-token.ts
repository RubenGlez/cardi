import jwt from "jsonwebtoken";

import { env } from "../env";

export function generateRefreshToken(user: { id: string }) {
  return jwt.sign(user, env.AUTH_API_REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
}
