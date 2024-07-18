import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { users } from "./users";

/**
 * Table
 */
export const sessions = pgTable("sessions", {
  refreshToken: varchar("refreshToken", { length: 255 }).notNull().primaryKey(),
  accessToken: varchar("accessToken", { length: 255 }).notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

/**
 * Relations
 */
export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

/**
 * Validations
 */
export const logoutSchema = createInsertSchema(sessions).omit({
  accessToken: true,
  userId: true,
});

export const refreshTokenSchema = createInsertSchema(sessions).omit({
  accessToken: true,
});
