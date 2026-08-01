import {
  type Nickname,
  NicknameAlreadyTakenError,
  type NicknameRegistry,
} from '@player/interface-adapters';

export class InMemoryNicknameRegistry implements NicknameRegistry {
  constructor(private readonly reserverdNicknames: Set<string>) {}
  isAlreadyTaken(nickname: Nickname): boolean {
    return this.reserverdNicknames.has(nickname.value);
  }

  reserve(nickname: Nickname): void {
    if (this.isAlreadyTaken(nickname))
      throw new NicknameAlreadyTakenError(nickname.value);
    this.reserverdNicknames.add(nickname.value);
  }
}
