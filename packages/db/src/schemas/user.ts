import { pgTable, timestamp, uuid, varchar, pgEnum } from "drizzle-orm/pg-core";

export const role = pgEnum("role", ["customer", "business"]);

export const User = pgTable("user", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }),
  image: varchar("image", { length: 255 }),
  role: role("role").notNull(),
});
