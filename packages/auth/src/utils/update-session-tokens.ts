import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { sessions } from "@repo/db/schema";

import { generateAccessToken } from "./generate-access-token";
import { generateRefreshToken } from "./generate-refresh-token";

interface UpdateSessionTokensProps {
  userId: string;
  refreshToken: string;
}

export const updateSessionTokens = async ({
  userId,
  refreshToken,
}: UpdateSessionTokensProps) => {
  const accessToken = generateAccessToken({ id: userId });
  const newRefreshToken = generateRefreshToken({ id: userId });

  await db
    .update(sessions)
    .set({ accessToken, refreshToken: newRefreshToken })
    .where(eq(sessions.refreshToken, refreshToken));

  return { accessToken, newRefreshToken };
};
