import {
  type Nickname,
  NicknameAlreadyTakenError,
  type NicknameRegistry,
} from '@player/interface-adapters';
import { isUniqueConstraintViolation } from '@shared/infrastructure';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { reservedNicknamesTable } from '../schemas';

export class DrizzleNicknameRegistry implements NicknameRegistry {
  constructor(private readonly drizzleClient: NodePgDatabase) {}

  async isAlreadyTaken(nickname: Nickname): Promise<boolean> {
    const rows = await this.drizzleClient
      .select({ nickname: reservedNicknamesTable.nickname })
      .from(reservedNicknamesTable)
      .where(eq(reservedNicknamesTable.nickname, nickname.value))
      .limit(1);
    return rows.length > 0;
  }

  async reserve(nickname: Nickname): Promise<void> {
    try {
      await this.drizzleClient
        .insert(reservedNicknamesTable)
        .values({ nickname: nickname.value });
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new NicknameAlreadyTakenError(nickname.value);
      }
      throw error;
    }
  }
}
