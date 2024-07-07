import { RequestHandler } from "express";

export const healthCheck: RequestHandler = async (req, res) => {
  res.success({ status: "UP!" });
};
