import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { generateAccessToken } from "../utils/generate-access-token";
import { generateRefreshToken } from "../utils/generate-refresh-token";

const logInInputSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const logIn: RequestHandler = async (req, res) => {
  const validationResult = logInInputSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.error(400, "Validation error", validationResult.error.format());
  }

  const { email, password } = validationResult.data;

  // TODO: Check uses exist (find user)
  const userFromDb = { id: "userId", password: "" }; // FYI: This is fake

  const isPasswordCorrect = await bcrypt.compare(password, userFromDb.password);

  if (!isPasswordCorrect) {
    return res.error(401, "Unauthorized");
  }

  const accessToken = generateAccessToken({ id: userFromDb.id });
  const refreshToken = generateRefreshToken({ id: userFromDb.id });

  res.success({ accessToken, refreshToken });
};