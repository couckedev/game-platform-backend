import type { Player, PlayerRegistrar } from '@player/interface-adapters';

export class InMemoryPlayerRegistrar implements PlayerRegistrar {
  constructor(
    private readonly reservedNickname: Set<string>,
    private readonly players: Map<string, Player>,
  ) {}

  async register(player: Player): Promise<void> {
    this.reservedNickname.add(player.nickname.value);
    this.players.set(player.playerId, player);
  }
}
