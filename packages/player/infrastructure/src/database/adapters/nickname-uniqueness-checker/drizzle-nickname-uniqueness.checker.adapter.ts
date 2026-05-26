import {
  Nickname,
  type NicknameUniquenessCheckerPort,
} from "player-domain";

import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { playersTable } from "../../schemas/players.schema";
import { eq } from "drizzle-orm";

export class DrizzleNicknameUniquenessChecker implements NicknameUniquenessCheckerPort {
  constructor(private readonly db: NodePgDatabase) {}

  async isUnique(nickname: Nickname): Promise<boolean> {
    const rows = await this.db
      .select()
      .from(playersTable)
      .where(eq(playersTable.nickname, nickname.value))
      .limit(1);

    return rows.length === 0;
  }
}
