import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  one: publicProcedure.query(() => {
    return "hello world! - 1";
  }),
  two: publicProcedure.query(() => {
    return "hello world! - 2";
  }),
  three: publicProcedure.query(() => {
    return "hello world! - 3";
  }),
});
