import { boolean, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const PLAYERS_TABLE_CONSTRAINTS = {
  primaryKey: 'players_table_pkey',
  uniqueNickname: 'unique_nickname',
  uniqueExternalAccountId: 'unique_external_account_id'
} as const;

export const playersTable = pgTable("players", {
  id:        text("id").notNull(),
  nickname:  text("nickname").notNull().unique(PLAYERS_TABLE_CONSTRAINTS.uniqueNickname),
  externalAccountId:  text("external_account_id").notNull().unique(PLAYERS_TABLE_CONSTRAINTS.uniqueExternalAccountId),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  isOnline: boolean("is_online").notNull().default(false),
}, (table) => [
  primaryKey({ name: PLAYERS_TABLE_CONSTRAINTS.primaryKey, columns: [table.id] })
]);

export type PlayerRow = typeof playersTable.$inferSelect;