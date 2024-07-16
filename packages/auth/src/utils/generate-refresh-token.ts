import jwt from "jsonwebtoken";

import { db } from "@repo/db/client";
import { RefreshToken } from "@repo/db/schema";

import type { AuthUser } from "../types/auth-user";
import { env } from "../../env";

export async function generateRefreshToken(user: AuthUser) {
  const refreshToken = jwt.sign(user, env.AUTH_API_REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });

  await db.insert(RefreshToken).values({ refreshToken });

  return refreshToken;
}
