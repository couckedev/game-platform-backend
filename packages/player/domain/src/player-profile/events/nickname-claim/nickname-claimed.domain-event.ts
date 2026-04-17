import { AbstractDomainEvent } from "@couckedev/ddd-core";
import type { Nickname } from "../../value-objects/nickname/nickname.value-object";
import type { PlayerId } from "../../../player-identity";

export class NicknameClaimedEvent extends AbstractDomainEvent {
  constructor(
    public readonly nickname: Nickname,
    public readonly claimedBy: PlayerId,
    public readonly claimedAt: Temporal.Instant,
  ) {
    super();
  }

  override get eventName(): string {
    return "NicknameClaimedEvent";
  }
}
