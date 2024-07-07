import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "@repo/db/client";
import { eq } from "@repo/db";
import { User } from "@repo/db/schema";

const signUpInputSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signUp: RequestHandler = async (req, res) => {
  const validationResult = signUpInputSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.error(400, "Validation error", validationResult.error.format());
  }

  const { email, password } = validationResult.data;

  const alreadyExistUser = await db.query.User.findFirst({
    where: eq(User.email, email),
  });

  if (!!alreadyExistUser) {
    return res.error(400, "Unauthorized");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db
    .insert(User)
    .values({ email, role: "customer", password: hashedPassword })
    .onConflictDoNothing()
    .returning();

  res.success(user[0], 201);
};
