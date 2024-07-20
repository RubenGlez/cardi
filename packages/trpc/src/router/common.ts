import { createTRPCRouter, publicProcedure } from "../trpc";

export const commonRouter = createTRPCRouter({
  health: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
});
