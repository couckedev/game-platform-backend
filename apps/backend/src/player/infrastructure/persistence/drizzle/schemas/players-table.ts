import { pgSchema, text, uuid } from 'drizzle-orm/pg-core';

export const PlayersTableConstraints = {
  NICKNAME_UNICITY: 'players_nickname_unique',
} as const;

export const playersTable = pgSchema('player').table('players', {
  id: uuid('id').primaryKey(),
  nickname: text('nickname').notNull().unique(PlayersTableConstraints.NICKNAME_UNICITY),
  externalAccountId: text('externalAccountId').notNull(),
});
