import { db } from "@repo/db/client";
import { sessions } from "@repo/db/schema";

import { generateAccessToken } from "./generate-access-token";
import { generateRefreshToken } from "./generate-refresh-token";

export const createSession = async (userId: string) => {
  const accessToken = generateAccessToken({ id: userId });
  const refreshToken = generateRefreshToken({ id: userId });

  await db
    .insert(sessions)
    .values({ accessToken, refreshToken, userId })
    .onConflictDoNothing();

  return { accessToken, refreshToken };
};
