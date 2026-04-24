import { BusinessError } from "@couckedev/ddd-core";
import { NicknameRejectionReason } from "../enums/nickname-rejection-reason.enum";

export class NicknameAlreadyUsedError extends BusinessError {
  readonly code = NicknameRejectionReason.AlreadyUsed;
  
  constructor(nickname: string) {
    super(
      `Nickname ${nickname} is already used by another player`,
    );
  }
}
