import type { Player } from '../entities';

export interface PlayerRepository {
  register(player: Player): void;
  getCurrentPlayer(): Player | null;
}
