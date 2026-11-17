import { Player } from '../entities';

export interface PlayerRepository {
  register(player: Player): Promise<void>;
  findByExternalAccountId(externalAccountId: string): Promise<Player | null>;
}
