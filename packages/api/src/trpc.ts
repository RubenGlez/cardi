import { TRPCError, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "@repo/db/client";

export const createTRPCContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];
  return { req, res, token, db };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.token) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // here we can add the logic to check that the user is logged in
  // Check this example: https://karthickragavendran.medium.com/authn-and-authz-with-trpc-dc8021d05710
  const user = { id: "", name: "ruben" };

  return next({ ctx: { ...ctx, token: ctx.token, user } });
});
