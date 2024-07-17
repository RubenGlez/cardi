import bcrypt from "bcrypt";

import { db } from "@repo/db/client";
import { User } from "@repo/db/schema";

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(User)
    .values({ email, role: "customer", password: hashedPassword })
    .onConflictDoNothing()
    .returning();

  return user;
};
