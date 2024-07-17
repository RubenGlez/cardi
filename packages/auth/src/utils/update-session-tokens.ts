import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { Session } from "@repo/db/schema";

import { generateAccessToken } from "./generate-access-token";
import { generateRefreshToken } from "./generate-refresh-token";

export const updateSessionTokens = async (
  userId: string,
  oldRefreshToken: string,
) => {
  const accessToken = generateAccessToken({ id: userId });
  const newRefreshToken = generateRefreshToken({ id: userId });

  await db
    .update(Session)
    .set({ accessToken, refreshToken: newRefreshToken })
    .where(eq(Session.refreshToken, oldRefreshToken));

  return { accessToken, newRefreshToken };
};
