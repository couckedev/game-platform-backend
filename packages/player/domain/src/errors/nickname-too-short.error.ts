import { BusinessError } from "@couckedev/ddd-core";
import { NicknameMinimumLength } from "../specifications/nickname-minimum-length/nickname-minimum-length.specification";
import { NicknameRejectionReason } from "../enums/nickname-rejection-reason.enum";

export class NicknameTooShortError extends BusinessError {
  readonly code = NicknameRejectionReason.TooShort;

  constructor(nickname: string) {
    super(
      `Nickname minimum lenght is ${NicknameMinimumLength.NICKNAME_MINIMUM_LENGTH}, ${nickname} is too short`,
    );
  }
}
