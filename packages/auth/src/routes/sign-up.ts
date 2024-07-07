import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";

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

  // TODO: Check email don't already exist

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword };

  // TODO: save user

  res.success(user, 201);
};
