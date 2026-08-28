import type { Player } from '../aggregates';

export interface PlayerRegistrar {
  register(player: Player): void | Promise<void>;
}
