import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  AUTH_API_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "AUTH_API_PORT must be a number",
    }),
  AUTH_API_ACCESS_TOKEN_SECRET: z.string(),
  AUTH_API_REFRESH_TOKEN_SECRET: z.string(),
});

// eslint-disable-next-line no-restricted-properties
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
