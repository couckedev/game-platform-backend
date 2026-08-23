import type { Player } from '../aggregates';

export interface PlayerRepository {
  findByExternalAccountId(
    externalAccountId: string,
  ): Promise<Player | null> | Player | null;
}
