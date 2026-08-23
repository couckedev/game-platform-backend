import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core';

export const PLAYERS_TABLE_CONSTRAINTS = {
  uniquePlayerId: 'unique_player_id',
  uniqueExternalAccountId: 'unique_external_account_id',
  primaryKey: 'pk_players',
} as const;

export const playersTable = pgTable(
  'players',
  {
    playerId: text('player_id')
      .notNull()
      .unique(PLAYERS_TABLE_CONSTRAINTS.uniquePlayerId),
    externalAccountId: text('external_account_id')
      .notNull()
      .unique(PLAYERS_TABLE_CONSTRAINTS.uniqueExternalAccountId),
    nickname: text('nickname').notNull(),
  },
  (table) => [
    primaryKey({
      name: PLAYERS_TABLE_CONSTRAINTS.primaryKey,
      columns: [table.playerId, table.externalAccountId],
    }),
  ],
);

export type PlayerRow = typeof playersTable.$inferSelect;
