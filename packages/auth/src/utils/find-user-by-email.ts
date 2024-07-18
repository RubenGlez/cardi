import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { users } from "@repo/db/schema";

export const findUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
};
