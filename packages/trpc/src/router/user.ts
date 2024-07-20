import { z } from "zod";

import { eq } from "@repo/db";
import { updateUserSchema, users } from "@repo/db/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.users.findFirst({
        where: eq(users.id, input.id),
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: updateUserSchema,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.update(users).set(input.data).where(eq(users.id, input.id));
    }),
});
