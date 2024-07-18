import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { roleEnum } from "./enums";

/**
 * Table
 */
export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }),
  image: varchar("image", { length: 255 }),
  role: roleEnum("role").notNull(),
});

/**
 * Relations
 */

/**
 * Validations
 */
export const signupSchema = createInsertSchema(users).omit({
  id: true,
  emailVerified: true,
  image: true,
  name: true,
});

export const loginSchema = createInsertSchema(users).omit({
  id: true,
  emailVerified: true,
  image: true,
  name: true,
  role: true,
});
