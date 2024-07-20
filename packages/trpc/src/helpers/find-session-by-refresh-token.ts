import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { sessions } from "@repo/db/schema";

export const findSessionByRefreshToken = async (refreshToken: string) => {
  return db.query.sessions.findFirst({
    where: eq(sessions.refreshToken, refreshToken),
  });
};
