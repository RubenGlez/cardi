import type { RequestHandler } from "express";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  const start = Date.now();

  console.log(`[REQUEST] ${req.method} ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[RESPONSE] ${req.method} ${req.url} ${res.statusCode}- ${duration}ms`,
    );
  });

  next();
};
