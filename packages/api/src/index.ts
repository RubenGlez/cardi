import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./root";
import { createTRPCContext } from "./trpc";

const app = express();

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  }),
);

app.listen(4000);
