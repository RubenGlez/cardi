import jwt from "jsonwebtoken";

import type { AuthUser } from "../types/auth-user";
import { env } from "../env";

export function decodeAccessToken(token: string): AuthUser | null {
  try {
    const user = jwt.verify(
      token,
      env.AUTH_API_ACCESS_TOKEN_SECRET,
    ) as AuthUser;
    return user;
  } catch (err) {
    return null;
  }
}
