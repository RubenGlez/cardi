import type { RequestHandler } from "express";

export const healthCheck: RequestHandler = (req, res) => {
  res.status(200).json({ mesage: "Up and running" });
};
