import type { Config } from "drizzle-kit";

import { env } from "./src/env";

const nonPoolingUrl = env.POSTGRES_URL.replace(":6543", ":5432");

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  tablesFilter: ["cardi_*"],
} satisfies Config;
