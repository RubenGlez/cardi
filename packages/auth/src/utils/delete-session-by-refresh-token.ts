import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { sessions } from "@repo/db/schema";

export const deleteSessionByRefreshToken = async (refreshToken: string) => {
  await db.delete(sessions).where(eq(sessions.refreshToken, refreshToken));
};
