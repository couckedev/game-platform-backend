import { BusinessError } from "@couckedev/ddd-core";
import { NicknameMaximumLength } from "../specifications/nickname-maximum-length/nickname-maximum-length.specification";
import { NicknameRejectionReason } from "../enums/nickname-rejection-reason.enum";

export class NicknameTooLongError extends BusinessError {
  readonly code = NicknameRejectionReason.TooLong;

  constructor(nickname: string) {
    super(
      `Nickname maximum lenght is ${NicknameMaximumLength.NICKNAME_MAXIMUM_LENGTH}, ${nickname} is too long`,
    );
  }
}
