import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  POSTGRES_URL: z.string().url(),
});

// eslint-disable-next-line no-restricted-properties
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
