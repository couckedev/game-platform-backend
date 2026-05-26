import { BusinessError } from "@couckedev/ddd-core";
import { PlayerRejectionReason } from "../enums/player-rejection-reason.enum";

export class EmptyExternalAccountIdError extends BusinessError {
  readonly code = PlayerRejectionReason.EmptyExternalAccountId;

  constructor() {
    super(`External account id cannot be empty`);
  }
}
