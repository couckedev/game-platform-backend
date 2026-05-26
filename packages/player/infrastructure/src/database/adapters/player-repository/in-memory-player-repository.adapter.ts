import type {
  Player,
  PlayerId,
  ExternalAccountId,
  PlayerRepositoryPort
} from "player-domain";
import { PlayerIdAlreadyUsedError } from "../../errors/player-id-already-used.error";

export class InMemoryPlayerRepository implements PlayerRepositoryPort {
  constructor(private readonly players: Map<string, Player>) {}

  async load(playerId: PlayerId): Promise<Player | null> {
    const player = this.players.get(playerId.value);
    if (!player) {
      return null;
    }
    return player;
  }

  async save(player: Player): Promise<void> {
    if (this.players.has(player.playerId.value)) {
      throw new PlayerIdAlreadyUsedError(player.playerId);
    }
    this.players.set(player.playerId.value, player);
  }

  async findByExternalAccountId(externalAccountId: ExternalAccountId): Promise<Player | null> {
    for (const player of this.players.values()) {
      if (player.externalAccountId.value === externalAccountId.value) {
        return player;
      }
    }
    return null;
  }

  async markAsOnline(playerId: PlayerId): Promise<void> {
    const player = this.players.get(playerId.value);
    if (player) {
      player.markAsOnline();
    }
  }
}
