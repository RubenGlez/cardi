import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import { env } from "../../../../apps/api/src/env";

export interface TokenPayload {
  id: string;
}

export interface DecodedToken extends JwtPayload, TokenPayload {}

export function decodeAccessToken(token: string) {
  try {
    const user = jwt.verify(token, env.AUTH_API_ACCESS_TOKEN_SECRET);
    return user as DecodedToken;
  } catch (err) {
    return null;
  }
}
