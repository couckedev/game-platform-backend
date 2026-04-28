import type {
  Player,
  PlayerId,
  PlayerRepositoryPort
} from "player-domain";

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
    this.players.set(player.playerId.value, player);
  }
}
