import {
  ExternalAccountId,
  type ExternalAccountIdUniquenessCheckerPort,
} from "player-domain";

import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { playersTable } from "../../schemas/players.schema";
import { eq } from "drizzle-orm";

export class DrizzleExternalAccountIdUniquenessChecker implements ExternalAccountIdUniquenessCheckerPort {
  constructor(private readonly db: NodePgDatabase) {}

  async isUnique(externalAccountId: ExternalAccountId): Promise<boolean> {
    const rows = await this.db
      .select()
      .from(playersTable)
      .where(eq(playersTable.externalAccountId, externalAccountId.value))
      .limit(1);

    return rows.length === 0;
  }
}
