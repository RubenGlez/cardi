import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { User } from "./user";

export const Session = pgTable("session", {
  refreshToken: varchar("refreshToken", { length: 255 }).notNull().primaryKey(),
  accessToken: varchar("accessToken", { length: 255 }).notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
});

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));
