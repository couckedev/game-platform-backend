import { Nickname, Player, PlayerId, type PlayerRepositoryPort } from "player-domain";

import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { playersTable } from "../schemas/players.schema";
import { eq } from "drizzle-orm";
import { Timestamp } from "shared-time";

export class DrizzlePlayerRepository implements PlayerRepositoryPort {  
    constructor(private readonly db: NodePgDatabase) {}

  async save(player: Player): Promise<void> {
    await this.db
      .insert(playersTable)
      .values({
        id:        player.playerId.value,
        nickname:  player.nickname.value,
        createdAt: player.createdAt.value,
      })
      .onConflictDoUpdate({
        target: playersTable.id,
        set: { nickname: player.nickname.value },
      });
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

    return Player.rehydrate(
      PlayerId.create(row.id),
      Nickname.create(row.nickname),
      Timestamp.fromISOString(row.createdAt),
    );
  }
}