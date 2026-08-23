import { pgTable, text } from 'drizzle-orm/pg-core';

export const RESERVED_NICKNAMES_TABLE_CONSTRAINTS = {
  uniqueNickname: 'unique_nickname',
} as const;

export const reservedNicknamesTable = pgTable('reserved_nicknames', {
  nickname: text('nickname')
    .notNull()
    .unique(RESERVED_NICKNAMES_TABLE_CONSTRAINTS.uniqueNickname),
});

export type ReservedNicknameRow = typeof reservedNicknamesTable.$inferSelect;
