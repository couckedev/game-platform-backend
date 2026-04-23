import { BusinessError } from "@couckedev/ddd-core";
import { NicknameRejectionReason } from "../enums/nickname-rejection-reason.enum";

export class NicknameInvalidCharactersError extends BusinessError {
  readonly code = NicknameRejectionReason.InvalidCharacters;
  
  constructor(nickname: string) {
    super(
      `Nickname ${nickname} must only contain alphanumeric characters, hyphens and underscores`,
    );
  }
}
