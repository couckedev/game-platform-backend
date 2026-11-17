import { NicknameAlreadyTakenError, Player, PlayerRepository } from '@/player/domain';

export class InMemoryPlayerRepository implements PlayerRepository {
  constructor(private readonly _registeredPlayers: Player[] = []) {}

  async register(player: Player): Promise<void> {
    if (
      this._registeredPlayers.find((registeredPlayer) =>
        registeredPlayer.nickname.equals(player.nickname),
      ) !== undefined
    ) {
      throw new NicknameAlreadyTakenError();
    }
    this._registeredPlayers.push(player);
  }

  async findByExternalAccountId(externalAccountId: string): Promise<Player | null> {
    const foundPlayer = this._registeredPlayers.find(
      (registeredPlayer) => registeredPlayer.externalAccountId === externalAccountId,
    );
    if (foundPlayer === undefined) {
      return null;
    }
    return foundPlayer;
  }
}
