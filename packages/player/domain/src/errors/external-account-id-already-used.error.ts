import { BusinessError } from "@couckedev/ddd-core";
import { PlayerRejectionReason } from "../enums/player-rejection-reason.enum";

export class ExternalAccountIdAlreadyUsedError extends BusinessError {
  readonly code = PlayerRejectionReason.ExternalAccountIdAlreadyUsed;

  constructor() {
    super(`External account id is already used by another player`);
  }
}
