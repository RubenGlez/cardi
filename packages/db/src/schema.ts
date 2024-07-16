import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const role = pgEnum("role", ["customer", "business"]);

export const User = pgTable("user", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }),
  image: varchar("image", { length: 255 }),
  role: role("role").notNull(),
});

export const RefreshToken = pgTable("refreshToken", {
  refreshToken: varchar("refreshToken", { length: 255 }).notNull().primaryKey(),
});
