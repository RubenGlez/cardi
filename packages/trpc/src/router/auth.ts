import { TRPCError } from "@trpc/server";

import {
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  signupSchema,
} from "@repo/db/schema";

import { createSession } from "../helpers/create-session";
import { createUser } from "../helpers/create-user";
import { deleteSessionByRefreshToken } from "../helpers/delete-session-by-refresh-token";
import { findUserByEmail } from "../helpers/fin-user-by-email";
import { findSessionByRefreshToken } from "../helpers/find-session-by-refresh-token";
import { getTokens } from "../helpers/get-tokens";
import { isPasswordValid } from "../helpers/is-password-valid";
import { isRefreshTokenValid } from "../helpers/is-refresh-token-valid";
import { isUserAlreadyExist } from "../helpers/is-user-already-exist";
import { updateSessionTokens } from "../helpers/update-session-tokens";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const { email, password } = input;

    // Find the user by email
    const user = await findUserByEmail(email);
    if (!user || !(await isPasswordValid(password, user.password))) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Email not registered",
      });
    }

    // Create session and generate tokens
    const { accessToken, refreshToken } = await createSession(user.id);

    // Send response based for mobile devices
    if (ctx.isMobile) {
      return { accessToken, refreshToken, userId: user.id };
    }

    // Send response based for web devices
    ctx.res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return { accessToken, userId: user.id };
  }),

  logOut: publicProcedure.input(logoutSchema).mutation(async ({ ctx }) => {
    const { refreshToken } = getTokens(ctx);

    // Delete the session associated with the refresh token
    await deleteSessionByRefreshToken(refreshToken);

    // Clear the refresh token cookie
    ctx.res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }),

  refreshToken: publicProcedure
    .input(refreshTokenSchema)
    .mutation(async ({ input, ctx }) => {
      const { userId, refreshToken } = input;

      // Find the user by email
      const session = await findSessionByRefreshToken(refreshToken);
      if (!session || !isRefreshTokenValid(refreshToken)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email not registered",
        });
      }

      // Update session tokens
      const { accessToken, newRefreshToken } = await updateSessionTokens({
        userId,
        refreshToken,
      });

      // Send response based for mobile devices
      if (ctx.isMobile) {
        return { accessToken, refreshToken: newRefreshToken };
      }

      // Send response based for web devices
      ctx.res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return { accessToken };
    }),

  signUp: publicProcedure.input(signupSchema).mutation(async ({ input }) => {
    const { email, password, role } = input;

    // Check if the user already exists
    if (await isUserAlreadyExist(email)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User already exist",
      });
    }

    // Create a new user
    await createUser({ email, password, role });
  }),
});
