import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { User } from "@repo/db/schema";

export const isUserAlreadyExist = async (email: string) => {
  const user = await db.query.User.findFirst({
    where: eq(User.email, email),
  });
  return Boolean(user);
};
