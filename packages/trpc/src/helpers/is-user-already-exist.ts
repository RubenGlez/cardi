import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { users } from "@repo/db/schema";

export const isUserAlreadyExist = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return Boolean(user);
};
