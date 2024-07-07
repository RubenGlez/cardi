import { RequestHandler } from "express";
import { z } from "zod";
import { generateAccessToken } from "../utils/generate-access-token";
import { generateRefreshToken } from "../utils/generate-refresh-token";

const refreshTokenInputSchema = z.object({
  userId: z.string({ message: "userId is required" }),
  refreshToken: z.string({ message: "refreshToken is required" }),
});

export const refreshToken: RequestHandler = async (req, res) => {
  const validationResult = refreshTokenInputSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.error(400, "Validation error", validationResult.error.format());
  }

  const { userId, refreshToken } = validationResult.data;

  const existRefreshToken = true; // TODO: find the token in DB
  if (!existRefreshToken) {
    return res.error(401, "Unauthorized");
  }

  // TODO: Remove the current refreshToken from the DB
  const accessToken = generateAccessToken({ id: userId });
  const newRefreshToken = generateRefreshToken({ id: userId });

  res.success({ accessToken, refreshToken: newRefreshToken }, 201);
};
