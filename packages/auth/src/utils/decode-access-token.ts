import jwt from "jsonwebtoken";

import type { DecodedToken } from "../types/decoded-token";
import { env } from "../env";

export function decodeAccessToken(token: string) {
  try {
    const user = jwt.verify(token, env.AUTH_API_ACCESS_TOKEN_SECRET);
    return user as DecodedToken;
  } catch (err) {
    return null;
  }
}
