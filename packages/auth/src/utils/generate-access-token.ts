import jwt from "jsonwebtoken";

import { env } from "../env";

export function generateAccessToken(user: { id: string }) {
  return jwt.sign(user, env.AUTH_API_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
