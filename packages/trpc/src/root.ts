import { authRouter } from "./router/auth";
import { commonRouter } from "./router/common";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  common: commonRouter,
});

export type AppRouter = typeof appRouter;
