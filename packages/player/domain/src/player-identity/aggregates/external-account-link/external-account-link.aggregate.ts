import { AbstractBasicAggregate } from "@couckedev/ddd-core";
import type { ExternalAccountId } from "../../value-objects/external-account-id.value-object";
import type { PlayerId } from "../../value-objects/player-id.value-object";

export class ExternalAccountLink extends AbstractBasicAggregate {
  constructor(
    public readonly externalAccountId: ExternalAccountId,
    private readonly playerId: PlayerId,
  ) {
    super();
  }

  isLinkedTo(): PlayerId {
    return this.playerId;
  }

  override get aggregateId(): string {
    return this.externalAccountId.value;
  }

  override get aggregateType(): string {
    return "external-account";
  }
}
