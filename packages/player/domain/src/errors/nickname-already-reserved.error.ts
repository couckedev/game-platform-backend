import { BusinessError } from "@couckedev/ddd-core";
import { NicknameRejectionReason } from "../enums/nickname-rejection-reason.enum";

export class NicknameAlreadyReservedError extends BusinessError {
  readonly code = NicknameRejectionReason.AlreadyReserved;
  
  constructor(nickname: string) {
    super(
      `Nickname ${nickname} is already reserved by another player`,
    );
  }
}
