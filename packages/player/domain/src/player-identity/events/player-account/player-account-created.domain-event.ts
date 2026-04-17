import { AbstractDomainEvent } from "@couckedev/ddd-core";
import type { PlayerId } from "../../../player-identity";

export class PlayerAccountCreatedEvent extends AbstractDomainEvent {
  constructor(
    public readonly playerId: PlayerId,
    public readonly createdAt: Temporal.Instant,
  ) {
    super();
  }

  override get eventName(): string {
    return "PlayerAccountCreatedEvent";
  }
}
