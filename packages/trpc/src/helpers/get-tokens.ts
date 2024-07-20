import type { createTRPCContext } from "../trpc";

export const getTokens = (ctx: ReturnType<typeof createTRPCContext>) => {
  const accessToken = ctx.req.headers.authorization?.split(" ")[1] ?? "";

  const refreshToken =
    (ctx.isMobile
      ? ctx.req.headers["x-refresh-token"]?.toString()
      : (ctx.req.cookies as { refreshToken?: string }).refreshToken) ?? "";

  return { accessToken, refreshToken };
};
