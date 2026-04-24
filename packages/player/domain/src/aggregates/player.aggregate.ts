import { AbstractBasicAggregate } from "@couckedev/ddd-core";
import type { Timestamp } from "shared-time";
import type { PlayerId } from "../value-objects/player-id/player-id.value-object";
import type { Nickname } from "../value-objects/nickname/nickname.value-object";

export class Player extends AbstractBasicAggregate {
  private constructor(
    public readonly playerId: PlayerId,
    private _nickname: Nickname,
    public readonly createdAt: Timestamp,
  ) {
    super();
  }

  static register(
    playerId: PlayerId,
    nickname: Nickname,
    createdAt: Timestamp,
  ): Player {
    return new Player(playerId, nickname, createdAt);
  }

  static rehydrate(
    playerId: PlayerId,
    nickname: Nickname,
    createdAt: Timestamp,
  ): Player {
    return new Player(playerId, nickname, createdAt);
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
}
