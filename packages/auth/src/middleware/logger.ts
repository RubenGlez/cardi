import type { RequestHandler } from "express";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  const start = Date.now();

  console.log(`[REQ] ${req.method} ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[RES] ${req.method} ${req.url} ${res.statusCode}- ${duration}ms`,
    );
  });

  next();
};
