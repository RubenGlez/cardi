import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import {
  appRouter,
  createExpressMiddleware,
  createTRPCContext,
} from "@repo/trpc";

import { env } from "./env";
import { loggerMiddleware } from "./middleware/logger";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  }),
);

app.listen(env.AUTH_API_PORT, () => {
  console.log(`🌍 Auth server running on port ${env.AUTH_API_PORT}`);
});
