import type { Player, PlayerRegistrar } from '@player/interface-adapters';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { playersTable, reservedNicknamesTable } from '../schemas';

export class DrizzlePlayerRegistrar implements PlayerRegistrar {
  constructor(private readonly drizzleClient: NodePgDatabase) {}

  async register(player: Player): Promise<void> {
    await this.drizzleClient.transaction(async (transaction) => {
      await transaction
        .insert(reservedNicknamesTable)
        .values({ nickname: player.nickname.value });
      await transaction.insert(playersTable).values({
        externalAccountId: player.externalAccountId,
        playerId: player.playerId,
        nickname: player.nickname.value,
      });
    });
  }
}
