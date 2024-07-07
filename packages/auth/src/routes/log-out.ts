import { eq } from "@repo/db";
import { db } from "@repo/db/client";
import { RefreshToken } from "@repo/db/schema";
import { RequestHandler } from "express";
import { z } from "zod";

const logOutInputSchema = z.object({
  refreshToken: z.string({ message: "refreshToken is required" }),
});

export const logOut: RequestHandler = async (req, res) => {
  const validationResult = logOutInputSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.error(400, "Validation error", validationResult.error.format());
  }

  const { refreshToken } = validationResult.data;

  await db
    .delete(RefreshToken)
    .where(eq(RefreshToken.refreshToken, refreshToken));

  res.success({ message: "logged out" }, 204);
};
