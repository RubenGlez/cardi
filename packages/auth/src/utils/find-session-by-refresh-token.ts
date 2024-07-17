import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { Session } from "@repo/db/schema";

export const findSessionByRefreshToken = async (refreshToken: string) => {
  return db.query.Session.findFirst({
    where: eq(Session.refreshToken, refreshToken),
  });
};
