import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth-user";
import { REFRESH_TOKEN_SECRET } from "../config";
import { db } from "@repo/db/client";
import { RefreshToken } from "@repo/db/schema";

export async function generateRefreshToken(user: AuthUser) {
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });

  await db.insert(RefreshToken).values({ refreshToken });

  return refreshToken;
}
