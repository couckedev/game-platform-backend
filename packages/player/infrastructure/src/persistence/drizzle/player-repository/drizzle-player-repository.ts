import {
  Nickname,
  Player,
  type PlayerRepository,
} from '@player/interface-adapters';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { playersTable } from '../schemas';

export class DrizzlePlayerRepository implements PlayerRepository {
  constructor(private readonly drizzleClient: NodePgDatabase) {}

  async findByExternalAccountId(
    externalAccountId: string,
  ): Promise<Player | null> {
    const [foundPlayer] = await this.drizzleClient
      .select()
      .from(playersTable)
      .where(eq(playersTable.externalAccountId, externalAccountId))
      .limit(1);
    if (foundPlayer === undefined) {
      return null;
    }
    return new Player(
      foundPlayer.playerId,
      foundPlayer.externalAccountId,
      Nickname.fromPersistence(foundPlayer.nickname),
    );
  }
}
