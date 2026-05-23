import type {
  Nickname,
  NicknameUniquenessCheckerPort,
  Player,
} from "player-domain";

export class InMemoryNicknameUniquenessChecker implements NicknameUniquenessCheckerPort {
  constructor(private readonly players: Map<string, Player>) {}

  async isUnique(nickname: Nickname): Promise<boolean> {
    for (const player of this.players.values()) {
      if (player.nickname.equals(nickname)) {
        return false;
      }
    }
    return true;
  }
}
