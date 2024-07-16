/* eslint-disable no-restricted-properties */
import path from "path";
import { fileURLToPath } from "url";
import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

export const env = createEnv({
  server: {
    AUTH_API_PORT: z.number(),
    AUTH_API_ACCESS_TOKEN_SECRET: z.string().min(1),
    AUTH_API_REFRESH_TOKEN_SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnvStrict: {
    AUTH_API_PORT: Number(process.env.AUTH_API_PORT),
    AUTH_API_ACCESS_TOKEN_SECRET: process.env.AUTH_API_ACCESS_TOKEN_SECRET,
    AUTH_API_REFRESH_TOKEN_SECRET: process.env.AUTH_API_REFRESH_TOKEN_SECRET,
  },
  clientPrefix: "",
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
