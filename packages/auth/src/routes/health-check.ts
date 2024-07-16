import type { RequestHandler } from "express";

export const healthCheck: RequestHandler = (req, res) => {
  res.success({ status: "UP!" });
};
