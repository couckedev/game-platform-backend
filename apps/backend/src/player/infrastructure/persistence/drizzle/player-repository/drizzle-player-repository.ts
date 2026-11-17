import { DrizzleQueryError, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseError } from 'pg';
import { Nickname, NicknameAlreadyTakenError, Player, PlayerRepository } from '@/player/domain';
import { PostgresqlErrorCodes } from '../helpers';
import * as schema from '../schemas';

export class DrizzlePlayerRepository implements PlayerRepository {
  constructor(private readonly database: NodePgDatabase<typeof schema>) {}

  async findByExternalAccountId(externalAccountId: string): Promise<Player | null> {
    const [foundPlayer] = await this.database
      .select()
      .from(schema.playersTable)
      .where(eq(schema.playersTable.externalAccountId, externalAccountId))
      .limit(1);
    if (foundPlayer !== undefined) {
      return {
        id: foundPlayer.id,
        externalAccountId: foundPlayer.externalAccountId,
        nickname: new Nickname(foundPlayer.nickname),
      };
    }
    return null;
  }

  async register(player: Player): Promise<void> {
    try {
      await this.database.insert(schema.playersTable).values({
        nickname: player.nickname.value,
        externalAccountId: player.externalAccountId,
        id: player.id,
      });
    } catch (error) {
      if (error instanceof DrizzleQueryError) {
        if (
          error.cause instanceof DatabaseError &&
          error.cause.code === PostgresqlErrorCodes.UNIQUE_CONSTRAINT_VIOLATION &&
          error.cause.constraint === schema.PlayersTableConstraints.NICKNAME_UNICITY
        ) {
          throw new NicknameAlreadyTakenError();
        }
      }
      throw error;
    }
  }
}
