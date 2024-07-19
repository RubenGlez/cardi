import type { z } from "zod";
import bcrypt from "bcrypt";

import type { signupSchema } from "@repo/db/schema";
import { db } from "@repo/db/client";
import { users } from "@repo/db/schema";

export const createUser = async ({
  email,
  password,
  role,
}: z.infer<typeof signupSchema>) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await db
    .insert(users)
    .values({ email, role, password: hashedPassword })
    .onConflictDoNothing();
};
