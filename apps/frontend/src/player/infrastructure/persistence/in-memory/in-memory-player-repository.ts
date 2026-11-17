import type { Player, PlayerRepository } from '@/player/domain';
import type { IdentityProvider } from '@/player/infrastructure/authentication/common';

export class InMemoryPlayerRepository implements PlayerRepository {

  constructor(
    private readonly _registeredPlayers = new Map<string, Player>(),
    private readonly identityProvider: IdentityProvider,
  ) {}

  register(player: Player): void {
    const identity = this.identityProvider.identity;
    if (identity === null) {
      throw new Error('Cannot register nickname, user is not signed in');
    }
    this._registeredPlayers.set(identity.externalAccountId, player);
  }

  getCurrentPlayer() {
    const identity = this.identityProvider.identity;
    if (identity === null) {
      throw new Error('Cannot authenticate player, user is not signed in');
    }
    return this._registeredPlayers.get(identity.externalAccountId) ?? null;
  }
}
