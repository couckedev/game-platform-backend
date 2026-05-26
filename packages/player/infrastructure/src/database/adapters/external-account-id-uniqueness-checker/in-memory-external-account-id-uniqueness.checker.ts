import type {
  ExternalAccountId,
  ExternalAccountIdUniquenessCheckerPort,
  Player,
} from "player-domain";

export class InMemoryExternalAccountIdUniquenessChecker implements ExternalAccountIdUniquenessCheckerPort {
  constructor(private readonly players: Map<string, Player>) {}

  async isUnique(externalAccountId: ExternalAccountId): Promise<boolean> {
    for (const player of this.players.values()) {
      if (player.externalAccountId.equals(externalAccountId)) {
        return false;
      }
    }
    return true;
  }
}
