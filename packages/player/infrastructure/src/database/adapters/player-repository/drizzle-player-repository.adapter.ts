import {
  ExternalAccountId,
  Nickname,
  Player,
  PlayerId,
  NicknameAlreadyUsedError,
  ExternalAccountIdAlreadyUsedError,
  type PlayerRepositoryPort,
} from "player-domain";

import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import {
  PLAYERS_TABLE_CONSTRAINTS,
  playersTable,
} from "../../schemas/players.schema";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { Timestamp } from "shared-kernels-time";
import { PlayerIdAlreadyUsedError } from "../../errors/player-id-already-used.error";
import { DatabaseError } from "pg";

export class DrizzlePlayerRepository implements PlayerRepositoryPort {
  constructor(private readonly db: NodePgDatabase) {}

  async save(player: Player): Promise<void> {
    try {
      await this.db.insert(playersTable).values({
        id: player.playerId.value,
        nickname: player.nickname.value,
        externalAccountId: player.externalAccountId.value,
        createdAt: new Date(player.createdAt.value),
        isOnline: player.isOnline,
      });
    } catch (error) {
      if (error instanceof DrizzleQueryError && error.cause instanceof DatabaseError) {
        if (
          error.cause.code === "23505" &&
          error.cause.constraint === PLAYERS_TABLE_CONSTRAINTS.primaryKey
        ) {
          throw new PlayerIdAlreadyUsedError(player.playerId);
        }

        if (
          error.cause.code === "23505" &&
          error.cause.constraint === PLAYERS_TABLE_CONSTRAINTS.uniqueNickname
        ) {
          throw new NicknameAlreadyUsedError(player.nickname.value);
        }

        if (
          error.cause.code === "23505" &&
          error.cause.constraint === PLAYERS_TABLE_CONSTRAINTS.uniqueExternalAccountId
        ) {
          throw new ExternalAccountIdAlreadyUsedError();
        }
      }
      throw error;
    }
  }

  async load(playerId: PlayerId): Promise<Player | null> {
    const [row] = await this.db
      .select()
      .from(playersTable)
      .where(eq(playersTable.id, playerId.value))
      .limit(1);

    if (!row) {
      return null;
    }

    return Player.fromPersistence(
      PlayerId.create(row.id),
      Nickname.create(row.nickname),
      ExternalAccountId.create(row.externalAccountId),
      Timestamp.fromISOString(row.createdAt.toISOString()),
      row.isOnline,
    );
  }

  async findByExternalAccountId(externalAccountId: ExternalAccountId): Promise<Player | null> {
    const [row] = await this.db
      .select()
      .from(playersTable)
      .where(eq(playersTable.externalAccountId, externalAccountId.value))
      .limit(1);

    if (!row) {
      return null;
    }

    return Player.fromPersistence(
      PlayerId.create(row.id),
      Nickname.create(row.nickname),
      ExternalAccountId.create(row.externalAccountId),
      Timestamp.fromISOString(row.createdAt.toISOString()),
      row.isOnline,
    );
  }

  async markAsOnline(playerId: PlayerId): Promise<void> {
    await this.db
      .update(playersTable)
      .set({ isOnline: true })
      .where(eq(playersTable.id, playerId.value));
  }
}
