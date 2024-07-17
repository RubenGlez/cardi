import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { User } from "@repo/db/schema";

export const findUserByEmail = async (email: string) => {
  return db.query.User.findFirst({
    where: eq(User.email, email),
  });
};
