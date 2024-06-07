import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  public: publicProcedure.query(() => {
    return "hello from public procedure";
  }),
  private: protectedProcedure.query(() => {
    return "hello from private procedure";
  }),
});
