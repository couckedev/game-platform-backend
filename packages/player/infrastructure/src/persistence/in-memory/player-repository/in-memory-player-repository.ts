import type { Player, PlayerRepository } from '@player/interface-adapters';

export class InMemoryPlayerRepository implements PlayerRepository {
  constructor(private readonly players: Map<string, Player>) {}

  findByExternalAccountId(externalAccountId: string): Player | null {
    const players = [...this.players.values()];
    const foundPlayer = players.find(
      (player: Player) => player.externalAccountId === externalAccountId,
    );
    if (foundPlayer === undefined) {
      return null;
    }

    return foundPlayer;
  }
}
