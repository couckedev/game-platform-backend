import { AbstractBasicAggregate } from "@couckedev/ddd-core";
import type { Timestamp } from "shared-kernels-time";
import type { PlayerId } from "../value-objects/player-id/player-id.value-object";
import type { Nickname } from "../value-objects/nickname/nickname.value-object";
import type { ExternalAccountId } from "../value-objects/external-account-id/external-account-id.value-object";

export class Player extends AbstractBasicAggregate {
  private constructor(
    public readonly playerId: PlayerId,
    private _nickname: Nickname,
    public readonly externalAccountId: ExternalAccountId,
    public readonly createdAt: Timestamp,
    private _isOnline: boolean,
  ) {
    super();
  }

  static register(
    playerId: PlayerId,
    nickname: Nickname,
    externalAccountId: ExternalAccountId,
    createdAt: Timestamp,
  ): Player {
    return new Player(playerId, nickname, externalAccountId, createdAt, true);
  }

  static fromPersistence(
    playerId: PlayerId,
    nickname: Nickname,
    externalAccountId: ExternalAccountId,
    createdAt: Timestamp,
    isOnline: boolean,
  ): Player {
    return new Player(playerId, nickname, externalAccountId, createdAt, isOnline);
  }

  markAsOnline(): void {
    this._isOnline = true;
  }

  get aggregateId(): string {
    return this.playerId.value;
  }

  get aggregateType(): string {
    return "player";
  }

  get nickname(): Nickname {
    return this._nickname;
  }

  get isOnline(): boolean {
    return this._isOnline;
  }
}
