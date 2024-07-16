import type { RequestHandler } from "express";
import { z } from "zod";

import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { RefreshToken } from "@repo/db/schema";

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

  const existRefreshToken = await db.query.RefreshToken.findFirst({
    where: eq(RefreshToken.refreshToken, refreshToken),
  });
  if (!existRefreshToken) {
    return res.error(401, "Unauthorized");
  }

  await db
    .delete(RefreshToken)
    .where(eq(RefreshToken.refreshToken, refreshToken));

  const accessToken = generateAccessToken({ id: userId });
  const newRefreshToken = generateRefreshToken({ id: userId });

  res.success({ accessToken, refreshToken: newRefreshToken }, 201);
};
