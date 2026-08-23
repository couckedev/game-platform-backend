import type { Nickname } from '../value-objects';

export class Player {
  constructor(
    public readonly playerId: string,
    private readonly _externalAccountId: string,
    private readonly _nickname: Nickname,
  ) {}

  get externalAccountId(): string {
    return this._externalAccountId;
  }

  get nickname(): Nickname {
    return this._nickname;
  }
}
