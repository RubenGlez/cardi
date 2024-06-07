import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./root";
import { createTRPCContext } from "./trpc";

function main() {
  const app = express();

  app.use((req, _res, next) => {
    console.log("⬅️ ", req.method, req.path, req.body ?? req.query);
    next();
  });

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: createTRPCContext,
    }),
  );

  app.get("/", (req, res) => {
    res.json({
      message: "it works!",
    });
  });

  app.listen(4000, () => {
    console.log("🌍 tRPC listening on port 4000");
  });
}

void main();
