import { BusinessError } from "@couckedev/ddd-core";
import { PlayerRejectionReason } from "../enums/player-rejection-reason.enum";

export class EmptyPlayerIdError extends BusinessError {
  readonly code = PlayerRejectionReason.EmptyPlayerId;

  constructor() {
    super(`Player id cannot be empty`);
  }
}
