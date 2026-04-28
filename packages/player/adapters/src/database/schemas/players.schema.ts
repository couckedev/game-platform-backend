import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
  id:        text("id").primaryKey(),
  nickname:  text("nickname").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull(),
});

export type PlayerRow = typeof playersTable.$inferSelect;