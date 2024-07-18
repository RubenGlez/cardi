import type { Request } from "express";

import { env } from "../env";

export const isFromMobile = (req: Request) => {
  return req.headers["x-trpc-source"] === env.AUTH_API_MOBILE_SOURCE;
};
