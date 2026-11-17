import type { Nickname, Player, PlayerRepository } from '@/player/domain';
import type { IdentityProvider } from '@/player/infrastructure/authentication/common';

export class InMemoryPlayerRepository implements PlayerRepository {

  constructor(
    private readonly _registeredPlayers = new Map<string, Player>(),
    private readonly identityProvider: IdentityProvider,
  ) {}

  async register(player: Player) {
    const identity = this.identityProvider.identity;
    if (identity === null) {
      throw new Error('Cannot register nickname, user is not signed in');
    }
    if (this.findRegisteredPlayerByNickname(player.nickname) !== null) {
      return { status: 'FAILURE' as const, error: 'NICKNAME_ALREADY_TAKEN' as const };
    }
    this._registeredPlayers.set(identity.externalAccountId, player);
    return { status: 'SUCCESS' as const };
  }

  private findRegisteredPlayerByNickname(nickname: Nickname) {
    return (
      [...this._registeredPlayers.values()].find((existingPlayer) =>
        existingPlayer.nickname.equals(nickname),
      ) ?? null
    );
  }

  async getCurrentPlayer() {
    const identity = this.identityProvider.identity;
    if (identity === null) {
      throw new Error('Cannot authenticate player, user is not signed in');
    }
    return this._registeredPlayers.get(identity.externalAccountId) ?? null;
  }
}
