import { z } from "zod";

const envSchema = z.object({
  POSTGRES_URL: z.string().url(),
  AUTH_API_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "AUTH_API_PORT must be a number",
    }),
  AUTH_API_ACCESS_TOKEN_SECRET: z.string(),
  AUTH_API_REFRESH_TOKEN_SECRET: z.string(),
  AUTH_API_MOBILE_SOURCE: z.string(),
  AUTH_API_WEB_SOURCE: z.string(),
});

// eslint-disable-next-line no-restricted-properties
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
