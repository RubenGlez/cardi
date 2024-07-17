import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { Session } from "@repo/db/schema";

export const deleteSessionByRefreshToken = async (refreshToken: string) => {
  await db.delete(Session).where(eq(Session.refreshToken, refreshToken));
};
